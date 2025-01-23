import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResponseDto } from 'src/common/common.dto';
import { HelperService } from 'src/common/helper/helper.service';
import {
  CreateFoodDto,
  UpdateFoodDto,
  UpdateFoodDtoIds,
} from 'src/database/dto/food.dto';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { Category } from 'src/database/entity/category.entity';
import { Food } from 'src/database/entity/food.entity';
import { FoodImage } from 'src/database/entity/foodImage.entity';
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
    @InjectRepository(FoodImage)
    private readonly foodImageRepository: Repository<FoodImage>,
  ) {}
  public async createNewFood(food: CreateFoodDto, userReq: UserJwtDto) {
    try {
      await this.helperService.validateAdmin(userReq);
      const maxPrice = 1e18;
      if (food.price > maxPrice) {
        throw new BadRequestException('PRICE_TOO_HIGH');
      }
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

      let foodImages = [];
      for (const image of food.images) {
        let foodImage = new FoodImage();
        foodImage.FoodID = newFood.foodID;
        foodImage.ImageURL = image.imageUrl;
        foodImage.IsPrimary = image.isPrimary;
        foodImages.push(foodImage);
      }
      await this.foodImageRepository.save(foodImages);
      newFood.images = foodImages;
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
        relations: ['category', 'price', 'images'],
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
        relations: ['category', 'price', 'images'],
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
        relations: ['category', 'price', 'images'],
      });
      if (!food) {
        throw new BadRequestException('FOOD_NOT_FOUND');
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
      if (!food) {
        throw new BadRequestException('FOOD_NOT_FOUND');
      }
      let category = await this.categoryRepository.findOne({
        where: { CategoryName: foodUpdate.categoryName },
      });
      if (!category && foodUpdate.categoryName) {
        category = new Category();
        category.CategoryName = foodUpdate.categoryName;
        await this.categoryRepository.save(category);
      } else if (!category) {
        throw new BadRequestException('CATEGORY_NOT_FOUND');
      }
      let price = await this.priceRepository.findOne({
        where: { Price: foodUpdate.price },
      });
      if (!price && foodUpdate.price) {
        price = new Price();
        price.Price = foodUpdate.price;
        await this.priceRepository.save(price);
      } else if (!price) {
        throw new BadRequestException('PRICE_NOT_FOUND');
      }
      food.name = foodUpdate.name;
      food.description = foodUpdate.description;
      food.category = category;
      food.price = price;
      food.stock = foodUpdate.stock;
      food.isAvailable = foodUpdate.isAvailable;
      let foodImages = [];
      for (const image of foodUpdate.images) {
        let foodImage = await this.foodImageRepository.findOne({
          where: { FoodID: food.foodID },
        });
        if (!foodImage) {
          foodImage = new FoodImage();
          foodImage.FoodID = food.foodID;
          foodImage.ImageURL = image.imageUrl;
          foodImage.IsPrimary = image.isPrimary;
          await this.foodImageRepository.save(foodImage);
        }
        foodImages.push(foodImage);
      }
      food.images = foodImages;
      await this.foodRepository.save(food);
      return food;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async updateFoodByIds(dto: UpdateFoodDtoIds, userReq: UserJwtDto) {
    try {
      await this.helperService.validateAdmin(userReq);
      for (let i = 0; i < dto.Id.length; i++) {
        const food = await this.foodRepository.findOne({
          where: { foodID: dto.Id[Number(i)] },
        });
        if (!food) {
          throw new BadRequestException('FOOD_NOT_FOUND');
        }
        let category = await this.categoryRepository.findOne({
          where: { CategoryName: dto.foodDto[i].categoryName },
        });
        if (!category && dto.foodDto[i].categoryName) {
          category = new Category();
          category.CategoryName = dto.foodDto[i].categoryName;
          await this.categoryRepository.save(category);
        } else if (!category) {
          throw new BadRequestException('CATEGORY_NOT_FOUND');
        }
        let price = await this.priceRepository.findOne({
          where: { Price: dto.foodDto[i].price },
        });
        if (!price && dto.foodDto[i].price) {
          price = new Price();
          price.Price = dto.foodDto[i].price;
          await this.priceRepository.save(price);
        } else if (!price) {
          throw new BadRequestException('PRICE_NOT_FOUND');
        }
        food.name = dto.foodDto[i].name;
        food.description = dto.foodDto[i].description;
        food.category = category;
        food.price = price;
        food.stock = dto.foodDto[i].stock;
        food.isAvailable = dto.foodDto[i].isAvailable;
        let foodImages = [];
        for (const image of dto.foodDto[i].images) {
          let foodImage = await this.foodImageRepository.findOne({
            where: { FoodID: dto.Id[Number(i)] },
          });
          if (!foodImage) {
            foodImage = new FoodImage();
            foodImage.FoodID = dto.Id[Number(i)];
            foodImage.ImageURL = image.imageUrl;
            foodImage.IsPrimary = image.isPrimary;
            await this.foodImageRepository.save(foodImage);
          }
          foodImages.push(foodImage);
        }
        food.images = foodImages;
        await this.foodRepository.save(food);
        return food;
      }
      return { message: 'FOODS_UPDATED_SUCCESSFULLY' };
    } catch (error) {
      throw new BadRequestException('ERROR_UPDATING_FOOD_BY_ID');
    }
  }

  public async deleteFood(id: number, userReq: UserJwtDto) {
    try {
      await this.helperService.validateAdmin(userReq);
      const food = await this.foodRepository.findOne({ where: { foodID: id } });
      const foodImages = await this.foodImageRepository.find({
        where: { FoodID: id },
      });
      await this.foodRepository.remove(food);
      await this.foodImageRepository.remove(foodImages);
      return { message: 'Food deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
