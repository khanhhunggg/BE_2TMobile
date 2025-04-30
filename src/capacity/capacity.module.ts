import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capacity } from '../entity/capacity.entity';
import { CapacityService } from './capacity.service';
import { CapacityController } from './capacity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Capacity])],
  controllers: [CapacityController],
  providers: [CapacityService],
})
export class CapacityModule {}
