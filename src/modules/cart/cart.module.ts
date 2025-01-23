import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from 'src/controller/cart/cart.controller';
import { Cart } from 'src/database/entity/cart.entity';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';
import { Food } from 'src/database/entity/food.entity';
import { Price } from 'src/database/entity/price.entity';
import { User } from 'src/database/entity/user.entity';
import { CartService } from 'src/service/cart/cart.service';
import { CartFoodService } from 'src/service/cart/cartFood.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Food, User, CartFood, Price])],
  controllers: [CartController],
  providers: [CartService, CartFoodService],
  exports: [CartService],
})
export class CartModule {}
