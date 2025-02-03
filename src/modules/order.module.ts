import { Module } from '@nestjs/common';
import { OrderController } from 'src/controller/order/order.controller';
import { OrderService } from 'src/service/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/database/entity/order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
