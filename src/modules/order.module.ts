import { Module } from '@nestjs/common';
import { OrderController } from 'src/controller/order/order.controller';
import { OrderService } from 'src/service/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/database/entity/order/order.entity';
import { OrderStatus } from 'src/database/entity/order/orderStatus.entity';
import { PaymentMethod } from 'src/database/entity/paymentMethod.entity';
import { Cart } from 'src/database/entity/cart/cart.entity';
import { Purchase } from 'src/database/entity/purchase.entity';
import { CartFoodService } from 'src/service/cart/cartFood.service';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';
import { Food } from 'src/database/entity/food/food.entity';
import { Price } from 'src/database/entity/food/price.entity';
import { CartFoodModule } from './cart/cartFood.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderStatus,
      PaymentMethod,
      Cart,
      Purchase,
      CartFood,
      Food,
      Price,
    ]),
    CartFoodModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, CartFoodService],
  exports: [OrderService],
})
export class OrderModule {}
