import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResponseDto } from 'src/common/common.dto';
import { HelperService } from 'src/common/helper/helper.service';
import { CreateFoodDto, UpdateFoodDto } from 'src/database/dto/food.dto';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { Category } from 'src/database/entity/category.entity';
import { Food } from 'src/database/entity/food.entity';
import { Price } from 'src/database/entity/price.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    private readonly helperService: HelperService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}
  public async createNewFood(food: CreateFoodDto, userReq: UserJwtDto) {
    try {
      await this.helperService.validateAdmin(userReq);
      let category = await this.categoryRepository.findOne({
        where: { CategoryName: food.categoryName },
      });
      if (!category) {
        category = new Category();
        category.CategoryName = food.categoryName;
        await this.categoryRepository.save(category);
      }
      let price = await this.priceRepository.findOne({
        where: { Price: food.price },
      });
      if (!price) {
        price = new Price();
        price.Price = food.price;
        await this.priceRepository.save(price);
      }
      const newFood = new Food();
      newFood.name = food.name;
      newFood.description = food.description;
      newFood.category = category;
      newFood.price = price;
      newFood.stock = food.stock;
      newFood.isAvailable = food.isAvailable;
      await this.foodRepository.save(newFood);
      return newFood;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async getAllFoood(paginationDto: PaginationResponseDto) {
    try {
      const { page, size } = paginationDto;
      const [data, total] = await this.foodRepository.findAndCount({
        skip: (page - 1) * size,
        take: size,
        relations: ['category', 'price'],
      });
      return { data, total, page, size };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getFoodByKeyWord(keyword: string) {
    try {
      const parsedPrice = parseFloat(keyword);
      const isNumber = !isNaN(parsedPrice);

      const whereConditions = [];

      whereConditions.push({ name: Like(`%${keyword}%`) });

      if (isNumber) {
        whereConditions.push({ price: { Price: parsedPrice } });
      }

      const category = await this.categoryRepository.findOne({
        where: { CategoryName: Like(`%${keyword}%`) },
      });
      if (category) {
        whereConditions.push({ category: { CategoryID: category.CategoryID } });
      }

      const food = await this.foodRepository.find({
        where: whereConditions,
        relations: ['category', 'price'],
      });
      return food;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getFoodById(id: number) {
    try {
      const food = await this.foodRepository.findOne({
        where: { foodID: id },
        relations: ['category', 'price'],
      });
      if (!food) {
        throw new BadRequestException('Food not found');
      }
      return food;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async updateFood(
    id: number,
    foodUpdate: UpdateFoodDto,
    userReq: UserJwtDto,
  ) {
    try {
      await this.helperService.validateAdmin(userReq);
      const food = await this.foodRepository.findOne({
        where: { foodID: id },
      });
      const category = await this.categoryRepository.findOne({
        where: { CategoryName: foodUpdate.categoryName },
      });
      const price = await this.priceRepository.findOne({
        where: { Price: foodUpdate.price },
      });
      if (!food) {
        throw new BadRequestException('FOOD_NOT_FOUND');
      }
      food.name = foodUpdate.name;
      food.description = foodUpdate.description;
      food.category = category;
      food.price = price;
      food.stock = foodUpdate.stock;
      food.isAvailable = foodUpdate.isAvailable;
      await this.foodRepository.save(food);
      return food;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  public async deleteFood(id: number, userReq: UserJwtDto) {
    try {
      await this.helperService.validateAdmin(userReq);
      const food = await this.foodRepository.findOne({ where: { foodID: id } });
      await this.foodRepository.remove(food);
      return { message: 'Food deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
