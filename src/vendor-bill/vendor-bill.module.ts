import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorBillController } from './vendor-bill.controller';
import { VendorBillService } from './vendor-bill.service';
import { Purchase } from 'src/entity/purchase.entity';
import { PurchaseOrderItem } from 'src/entity/purchase-order-item.entity';
import { ProductDetail } from 'src/entity/product-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, PurchaseOrderItem, ProductDetail]),
  ],
  controllers: [VendorBillController],
  providers: [VendorBillService],
})
export class VendorBillModule {}
