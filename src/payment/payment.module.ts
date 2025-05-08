import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PayOSService } from './payos.service';
import { Order } from 'src/entity/order.entity';
import { Payment } from 'src/entity/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Payment]), HttpModule],
  controllers: [PaymentController],
  providers: [PaymentService, PayOSService],
  exports: [PaymentService],
})
export class PaymentModule {}
