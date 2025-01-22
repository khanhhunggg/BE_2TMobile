import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../database/entity/cart.entity';
import { CartController } from 'src/controller/cart.controller';
import { CartService } from 'src/service/cart. service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
