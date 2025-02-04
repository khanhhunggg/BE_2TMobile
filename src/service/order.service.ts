import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateIdDto,
  CreateOrderDto,
  UpdateOrderDto,
} from 'src/database/dto/order/order.dto';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';
import { Order } from 'src/database/entity/order/order.entity';
import { OrderStatus } from 'src/database/entity/order/orderStatus.entity';
import { PaymentMethod } from 'src/database/entity/paymentMethod.entity';
import { Repository } from 'typeorm';
import { CartFoodService } from './cart/cartFood.service';

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
    private readonly cartFoodService: CartFoodService,
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
          const cart = await this.cartFoodRepository.findOne({
            where: { CartFoodID: Number(id) },
          });
          if (!cart) throw new BadRequestException('CART_NOT_FOUND');
          const totalPrice =
            await this.cartFoodService.calculatePriceForEachFoodInCart(
              cart.CartFoodID,
            );
          console.log(totalPrice);
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
      return newOrder;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async updateOrder(id: number, dto: UpdateOrderDto) {
    try {
      return await this.orderRepository.update(id, dto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
