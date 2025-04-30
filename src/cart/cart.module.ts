import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from 'src/entity/cart.entity';
import { CartDetail } from 'src/entity/cart-detail.entity';
import { ProductDetail } from 'src/entity/product-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartDetail, ProductDetail])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
