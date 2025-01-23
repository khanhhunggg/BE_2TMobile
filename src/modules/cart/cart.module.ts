import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from 'src/controller/cart/cart.controller';
import { Cart } from 'src/database/entity/cart/cart.entity';
import { Food } from 'src/database/entity/food.entity';
import { User } from 'src/database/entity/user.entity';
import { CartService } from 'src/service/cart/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Food, User])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
