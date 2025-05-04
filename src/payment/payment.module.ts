import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Order } from 'src/entity/order.entity';
import { Payment } from 'src/entity/payment.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Order, Payment])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
