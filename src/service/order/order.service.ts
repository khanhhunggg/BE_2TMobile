import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResponseDto } from 'src/common/common.dto';
import { HelperService } from 'src/common/helper/helper.service';
import { CreateIdDto, CreateOrderDto } from 'src/database/dto/order/order.dto';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';
import { Order } from 'src/database/entity/order/order.entity';
import { OrderStatus } from 'src/database/entity/order/orderStatus.entity';
import { PaymentMethod } from 'src/database/entity/paymentMethod.entity';
import { In, Repository } from 'typeorm';
import { CartFoodService } from '../cart/cartFood.service';
import { OrderDetail } from 'src/database/entity/order/orderDetail.entity';
import { OrderDetailService } from './orderDetail.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(CartFood)
    private readonly cartFoodRepository: Repository<CartFood>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    private readonly cartFoodService: CartFoodService,
    private readonly helperService: HelperService,
    private readonly orderDetailService: OrderDetailService,
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
      let cart;
      let cartPrice = 0;
      const newOrder = new Order();
      newOrder.UserID = Number(userReq.id);
      newOrder.StatusID = 1;
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

      return { newOrder };
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
        relations: ['orderDetails', 'orderDetails.food'],
        order: { OrderID: 'DESC' },
        skip: skip,
        take: size,
      });
      return {
        orders,
        totalItems: total,
        currentPage: page,
        pageSize: size,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
