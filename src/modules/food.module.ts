import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from 'src/database/entity/food.entity';
import { FoodController } from 'src/controller/food.controller';
import { FoodService } from 'src/service/food.service';
import { Category } from 'src/database/entity/category.entity';
import { Price } from 'src/database/entity/price.entity';
import { HelperModule } from 'src/common/helper/helper.module';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Category, Price]), HelperModule],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
