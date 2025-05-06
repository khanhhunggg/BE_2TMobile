import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnService } from './return.service';
import { ReturnController } from './return.controller';
import { Return } from '../entity/return.entity';
import { ReturnDetail } from '../entity/return-detail.entity';
import { OrderDetail } from '../entity/order-detail.entity';
import { PurchaseOrderItem } from '../entity/purchase-order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Return,
      ReturnDetail,
      OrderDetail,
      PurchaseOrderItem,
    ]),
  ],
  controllers: [ReturnController],
  providers: [ReturnService],
  exports: [ReturnService],
})
export class ReturnModule {}
