import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from 'src/database/entity/food/food.entity';
import { FoodController } from 'src/controller/food.controller';
import { FoodService } from 'src/service/food.service';
import { Category } from 'src/database/entity/food/category.entity';
import { Price } from 'src/database/entity/food/price.entity';
import { HelperModule } from 'src/common/helper/helper.module';
import { FoodImage } from 'src/database/entity/food/foodImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food, Category, Price, FoodImage]),
    HelperModule,
  ],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService],
})
export class FoodModule {}
