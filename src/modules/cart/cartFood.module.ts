import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartFoodController } from 'src/controller/cart/cartFood.controller';
import { Cart } from 'src/database/entity/cart.entity';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';
import { Food } from 'src/database/entity/food.entity';
import { Price } from 'src/database/entity/price.entity';
import { CartFoodService } from 'src/service/cart/cartFood.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartFood, Cart, Food, Price])],
  controllers: [CartFoodController],
  providers: [CartFoodService],
  exports: [CartFoodService],
})
export class CartFoodModule {}
