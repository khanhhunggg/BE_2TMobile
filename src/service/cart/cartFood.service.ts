import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';
import {
  AddToCartFoodDto,
  CalculateTotalPriceDto,
  DeleteCartFoodDto,
  GetCartFoodDto,
  UpdateCartFoodDto,
} from 'src/database/dto/cart/cartfood.dto';
import { BadRequestException } from '@nestjs/common';
import { Food } from 'src/database/entity/food/food.entity';
import { Price } from 'src/database/entity/food/price.entity';
import * as moment from 'moment';

export class CartFoodService {
  constructor(
    @InjectRepository(CartFood)
    private cartFoodRepository: Repository<CartFood>,
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}
  public async addToCartFood(dto: AddToCartFoodDto) {
    try {
      const food = await this.foodRepository.findOne({
        where: { foodID: dto.FoodID },
      });
      if (!food) {
        throw new BadRequestException('FOOD_NOT_FOUND');
      }
      const existingCart = await this.cartFoodRepository.findOne({
        where: { food: food, CartID: dto.CartID },
      });
      if (existingCart) {
        existingCart.Quantity =
          Number(existingCart.Quantity) + Number(dto.Quantity);
        await this.cartFoodRepository.save(existingCart);
        return existingCart;
      } else {
        const newCart = new CartFood();
        newCart.food = food;
        newCart.Quantity = dto.Quantity;
        newCart.CartID = dto.CartID;
        newCart.CreatedAt = new Date();
        newCart.UpdatedAt = new Date();
        await this.cartFoodRepository.save(newCart);
        return newCart;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  public async getCartFood(dto: GetCartFoodDto) {
    try {
      const cartFood = await this.cartFoodRepository.find({
        where: {
          CartID: dto.CartID,
          CartFoodID: dto.CartFoodID,
          food: { isAvailable: true },
        },
        relations: ['food'],
      });
      if (!cartFood) {
        throw new BadRequestException('CART_FOOD_NOT_FOUND');
      }
      return { cartFood };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async updateCartFood(dto: UpdateCartFoodDto) {
    try {
      const cartFood = await this.cartFoodRepository.findOne({
        where: {
          CartFoodID: dto.CartFoodID,
          food: { isAvailable: true },
        },
        relations: ['food'],
      });
      if (!cartFood) {
        throw new BadRequestException('CART_FOOD_NOT_FOUND_OR_NOT_AVAILABLE');
      }
      cartFood.Quantity = dto.Quantity;
      cartFood.UpdatedAt = new Date();
      await this.cartFoodRepository.save(cartFood);
      return cartFood;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async deleteCartFood(dto: DeleteCartFoodDto) {
    try {
      const cartFood = await this.cartFoodRepository.findOne({
        where: {
          CartFoodID: dto.CartFoodID,
          food: { isAvailable: true },
        },
        relations: ['food'],
      });
      if (!cartFood) {
        throw new BadRequestException('CART_FOOD_NOT_FOUND_OR_NOT_AVAILABLE');
      }
      await this.cartFoodRepository.delete(cartFood);
      return cartFood;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async calculatePriceForEachFoodInCart(cartId: number) {
    try {
      const cartFoods = await this.cartFoodRepository.find({
        where: { CartID: cartId },
        relations: ['food'],
      });
      if (!cartFoods.length) {
        throw new BadRequestException('NO_FOOD_IN_CART');
      }
      const prices = await Promise.all(
        cartFoods.map(async (cartFood) => {
          const price = await this.priceRepository.findOne({
            where: { PriceID: cartFood.food.priceID },
          });
          const today = moment().format('YYYY-MM-DD');
          if (
            new Date(price.ValidFrom) < new Date(today) &&
            new Date(price.ValidTo) > new Date(today)
          ) {
            return price.Price;
          } else {
            throw new BadRequestException(
              'PRICE_NOT_VALID_FOR_FOOD_ID_' + cartFood.food.foodID,
            );
          }
        }),
      );

      return prices;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getAll(dto: GetCartFoodDto) {
    try {
      const cartFoods = await this.cartFoodRepository.find({
        where: { CartID: dto.CartID, CartFoodID: dto.CartFoodID },
        relations: ['food'],
      });
      if (!cartFoods.length) {
        throw new BadRequestException('NO_FOOD_IN_CART');
      }
      const prices = await this.calculatePriceForEachFoodInCart(dto.CartID);
      const result = cartFoods.map((cartFood, index) => ({
        CartFoodID: cartFood.CartFoodID,
        CartID: cartFood.CartID,
        Quantity: cartFood.Quantity,
        CreatedAt: cartFood.CreatedAt,
        UpdatedAt: cartFood.UpdatedAt,
        foodID: cartFood.food.foodID,
        name: cartFood.food.name,
        description: cartFood.food.description,
        categoryID: cartFood.food.categoryID,
        priceID: cartFood.food.priceID,
        stock: cartFood.food.stock,
        isAvailable: cartFood.food.isAvailable,
        price: prices[index],
      }));
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
