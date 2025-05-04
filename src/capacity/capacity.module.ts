import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capacity } from '../entity/capacity.entity';
import { CapacityPrice } from '../entity/capacity-price.entity';
import { CapacityService } from './capacity.service';
import { CapacityController } from './capacity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Capacity, CapacityPrice])],
  controllers: [CapacityController],
  providers: [CapacityService],
})
export class CapacityModule {}
