import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Purchase } from 'src/entity/purchase.entity';
import { Order } from 'src/entity/order.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Order])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
