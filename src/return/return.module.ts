import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnService } from './return.service';
import { ReturnController } from './return.controller';
import { Return } from '../entity/return.entity';
import { ReturnDetail } from '../entity/return-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Return, ReturnDetail])],
  controllers: [ReturnController],
  providers: [ReturnService],
  exports: [ReturnService],
})
export class ReturnModule {}
