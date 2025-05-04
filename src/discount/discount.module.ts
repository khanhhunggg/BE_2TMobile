import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from '../entity/discount.entity';
import { DiscountUser } from '../entity/discountUser.entity';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Discount, DiscountUser])],
  controllers: [DiscountController],
  providers: [DiscountService],
  exports: [DiscountService],
})
export class DiscountModule {}
