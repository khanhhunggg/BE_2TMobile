import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from 'src/common/helper/helper.module';
import { OrderController } from 'src/controller/order/order.controller';
import { Cart } from 'src/database/entity/cart/cart.entity';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';
import { Food } from 'src/database/entity/food/food.entity';
import { Price } from 'src/database/entity/food/price.entity';
import { Order } from 'src/database/entity/order/order.entity';
import { OrderDetail } from 'src/database/entity/order/orderDetail.entity';
import { OrderStatus } from 'src/database/entity/order/orderStatus.entity';
import { PaymentMethod } from 'src/database/entity/paymentMethod.entity';
import { Purchase } from 'src/database/entity/purchase.entity';
import { ShippingMethod } from 'src/database/entity/shippingMethod.entity';
import { CartFoodService } from 'src/service/cart/cartFood.service';
import { OrderService } from 'src/service/order/order.service';
import { OrderDetailService } from 'src/service/order/orderDetail.service';
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
      OrderDetail,
      ShippingMethod,
    ]),
    CartFoodModule,
    HelperModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, CartFoodService, OrderDetailService],
  exports: [OrderService],
})
export class OrderModule {}
