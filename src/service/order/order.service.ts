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

      const newOrder = new Order();
      newOrder.UserID = Number(userReq.id);
      newOrder.StatusID = 1;
      newOrder.PaymentMethodID = order.PaymentMethodID;
      newOrder.cart = cart;
      newOrder.DeliveryAddress = order.DeliveryAddress;
      newOrder.Note = order.Note;
      newOrder.TotalPrice = Number(cartPrice);

      await this.orderRepository.save(newOrder);
      await this.orderDetailService.createOrderDetail({
        OrderID: newOrder.OrderID,
      });
      return { newOrder };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getAllOrderInfomation(
    userReq: UserJwtDto,
    paginationDto: PaginationResponseDto,
  ) {
    try {
      const { page, size } = paginationDto;
      const skip = (page - 1) * size;
      const orderDetails = await this.orderDetailRepository
        .createQueryBuilder('orderDetail')
        .leftJoinAndSelect('orderDetail.food', 'food')
        .leftJoinAndSelect('food.category', 'category')
        .leftJoinAndSelect('food.price', 'price')
        .where('orderDetail.OrderID IN (:...orderIds)', {
          orderIds: (
            await this.orderRepository.find({
              select: ['OrderID'],
              where: { UserID: Number(userReq.id) },
            })
          ).map((o) => o.OrderID),
        })
        .select([
          'orderDetail.OrderDetailID',
          'orderDetail.Quantity',
          'orderDetail.UnitPrice',
          'orderDetail.Total',
          'food.name',
          'food.description',
          'food.stock',
          'food.isAvailable',
          'category.CategoryName',
          'price.Price',
        ])
        .skip(skip)
        .take(size)
        .getMany();

      return {
        orderDetails,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
