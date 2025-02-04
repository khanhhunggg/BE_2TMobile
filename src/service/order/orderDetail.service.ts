import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from 'src/database/entity/order/orderDetail.entity';
import { CreateOrderDetailDto } from 'src/database/dto/order/order.dto';
import { Order } from 'src/database/entity/order/order.entity';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';
import { Food } from 'src/database/entity/food/food.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CartFood)
    private readonly cartFoodRepository: Repository<CartFood>,
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}

  public async createOrderDetail(dto: CreateOrderDetailDto) {
    try {
      const order = await this.orderRepository.findOne({
        where: { OrderID: dto.OrderID },
        relations: ['cart'],
      });
      if (!order) {
        throw new BadRequestException('ORDER_NOT_FOUND');
      }
      if (!order.cart) {
        throw new BadRequestException('ORDER_CART_NOT_LOADED');
      }
      const cartFood = await this.cartFoodRepository.findOne({
        where: { CartID: order.cart.CartID },
      });
      if (!cartFood) {
        throw new BadRequestException('CART_FOOD_NOT_FOUND');
      }
      const food = await this.foodRepository.findOne({
        where: { foodID: cartFood.FoodID },
        relations: ['price'],
      });
      if (!food) {
        throw new BadRequestException('FOOD_NOT_FOUND');
      }
      const orderDetail = new OrderDetail();
      orderDetail.OrderID = dto.OrderID;
      orderDetail.FoodID = food.foodID;
      orderDetail.Quantity = cartFood.Quantity;
      orderDetail.UnitPrice = food.price.Price;
      orderDetail.Total = food.price.Price * cartFood.Quantity;
      await this.orderDetailRepository.save(orderDetail);
      return { orderDetail };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
