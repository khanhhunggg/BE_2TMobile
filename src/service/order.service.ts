import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResponseDto } from 'src/common/common.dto';
import { HelperService } from 'src/common/helper/helper.service';
import {
  CreateIdDto,
  CreateOrderDto,
  GetAllOrderByStatusIdDto,
  UpdateOrderStatusDto,
} from 'src/database/dto/order/order.dto';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';
import { Order } from 'src/database/entity/order/order.entity';
import { OrderStatus } from 'src/database/entity/order/orderStatus.entity';
import { PaymentMethod } from 'src/database/entity/paymentMethod.entity';
import { ShippingMethod } from 'src/database/entity/shippingMethod.entity';
import { Repository } from 'typeorm';
import { CartFoodService } from './cartFood.service';
import { OrderDetailService } from './orderDetail.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(CartFood)
    private readonly cartFoodRepository: Repository<CartFood>,
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
    @InjectRepository(ShippingMethod)
    private readonly shippingMethodRepository: Repository<ShippingMethod>,
    private readonly cartFoodService: CartFoodService,
    private readonly orderDetailService: OrderDetailService,
    private readonly helperService: HelperService,
  ) {}

  public async createOrder(
    cartFoodId: CreateIdDto,
    order: CreateOrderDto,
    userReq: UserJwtDto,
  ) {
    try {
      if (!userReq.id) {
        throw new BadRequestException('USER_NOT_FOUND');
      }
      const paymentMethod = await this.paymentMethodRepository.findOne({
        where: { PaymentMethodID: order.PaymentMethodID },
      });
      if (!paymentMethod) {
        throw new BadRequestException('PAYMENT_METHOD_NOT_FOUND');
      }
      const shippingMethod = await this.shippingMethodRepository.findOne({
        where: { ShippingID: order.ShippingMethodID },
      });
      if (!shippingMethod) {
        throw new BadRequestException('SHIPPING_METHOD_NOT_FOUND');
      }
      let cart;
      let cartPrice = 0;
      const newOrder = new Order();
      newOrder.UserID = Number(userReq.id);
      newOrder.StatusID = 1;
      newOrder.shippingMethod = shippingMethod;
      newOrder.PaymentMethodID = order.PaymentMethodID;
      newOrder.DeliveryAddress = order.DeliveryAddress;
      newOrder.Note = order.Note;

      if (cartFoodId.CartFoodID.length > 0) {
        for (const id of cartFoodId.CartFoodID) {
          cart = await this.cartFoodRepository.findOne({
            where: { CartFoodID: Number(id) },
          });
          if (!cart) throw new BadRequestException('CART_NOT_FOUND');
          const totalPrice =
            await this.cartFoodService.calculatePriceForEachFoodInCart(
              cart.CartFoodID,
            );
          cartPrice += totalPrice.reduce((a, b) => a + b, 0);
        }
      }

      newOrder.cart = cart;
      newOrder.TotalPrice = Number(cartPrice);
      await this.orderRepository.save(newOrder);

      if (cartFoodId.CartFoodID.length > 0) {
        for (const id of cartFoodId.CartFoodID) {
          await this.orderDetailService.createOrderDetail({
            OrderID: newOrder.OrderID,
            CartFoodID: Number(id),
          });
        }
      }

      return {
        newOrder,
        MESSAGES: 'CREATE_ORDER_SUCCESS',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getOrderInformation(
    userReq: UserJwtDto,
    paginationDto: PaginationResponseDto,
  ) {
    try {
      let { page, size } = paginationDto;
      page = Math.max(1, page);
      size = size > 0 ? size : 10;

      const skip = (page - 1) * size;
      const [orders, total] = await this.orderRepository.findAndCount({
        where: { UserID: Number(userReq.id) },
        relations: ['shippingMethod', 'orderDetails', 'orderDetails.food'],
        order: { OrderID: 'DESC' },
        skip: skip,
        take: size,
      });
      return {
        orders,
        totalItems: total,
        currentPage: page,
        pageSize: size,
        MESSAGES: 'GET_ORDER_INFORMATION_SUCCESS',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getAllOrderByStatusId(
    dto: GetAllOrderByStatusIdDto,
    userReq: UserJwtDto,
    paginationDto: PaginationResponseDto,
  ) {
    try {
      let { page, size } = paginationDto;
      page = Math.max(1, page);
      size = size > 0 ? size : 10;

      const skip = (page - 1) * size;
      const [orders, total] = await this.orderRepository.findAndCount({
        where: { StatusID: dto.OrderStatusID, UserID: Number(userReq.id) },
        relations: ['shippingMethod', 'orderDetails', 'orderDetails.food'],
        order: { OrderID: 'DESC' },
        skip: skip,
        take: size,
      });
      return {
        orders,
        totalItems: total,
        currentPage: page,
        pageSize: size,
        MESSAGES: 'GET_ALL_ORDER_BY_STATUS_ID_SUCCESS',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async updateOrderStatusUser(
    dto: UpdateOrderStatusDto,
    userReq: UserJwtDto,
  ) {
    try {
      const orderStatus = await this.orderStatusRepository.findOne({
        where: { StatusID: dto.OrderStatusID },
      });
      if (!orderStatus) {
        throw new BadRequestException('ORDER_STATUS_NOT_FOUND');
      }
      const order = await this.orderRepository.findOne({
        where: { OrderID: dto.OrderID, UserID: Number(userReq.id) },
      });
      if (!order) {
        throw new BadRequestException('ORDER_NOT_FOUND');
      }
      if (!userReq.isAdmin) {
        if (order.StatusID === 1 || order.StatusID === 2) {
          if (dto.OrderStatusID === 5) {
            order.StatusID = dto.OrderStatusID;
            await this.orderRepository.save(order);
          } else {
            throw new BadRequestException('CANNOT_UPDATE_ORDER_STATUS');
          }
        } else if (order.StatusID === 3 && dto.OrderStatusID === 7) {
          order.StatusID = dto.OrderStatusID;
          await this.orderRepository.save(order);
        } else {
          throw new BadRequestException('CANNOT_UPDATE_ORDER_STATUS');
        }
      } else {
        order.StatusID = dto.OrderStatusID;
        await this.orderRepository.save(order);
      }
      return {
        order,
        MESSAGES: 'UPDATE_ORDER_STATUS_SUCCESS',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async updateOrderStatusAdmin(
    dto: UpdateOrderStatusDto,
    userReq: UserJwtDto,
  ) {
    try {
      await this.helperService.validateAdmin(userReq);
      const order = await this.orderRepository.findOne({
        where: { OrderID: dto.OrderID },
      });
      if (!order) {
        throw new BadRequestException('ORDER_NOT_FOUND');
      }
      const orderStatus = await this.orderStatusRepository.findOne({
        where: { StatusID: dto.OrderStatusID },
      });
      if (!orderStatus) {
        throw new BadRequestException('INVALID_ORDER_STATUS_ID');
      }
      order.StatusID = dto.OrderStatusID;
      await this.orderRepository.save(order);
      return {
        order,
        MESSAGES: 'UPDATE_ORDER_STATUS_SUCCESS',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
