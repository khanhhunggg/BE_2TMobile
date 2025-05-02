import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from '../entity/purchase.entity';
import { PurchaseOrderItem } from '../entity/purchase-order-item.entity';
import { Vendor } from '../entity/vendor.entity';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, PurchaseOrderItem, Vendor])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}
