import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddToCartDto, GetCartByDateDto } from 'src/database/dto/cart/cart.dto';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { Cart } from 'src/database/entity/cart.entity';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';
import { Repository } from 'typeorm';
import { CartFoodService } from './cartFood.service';
import * as moment from 'moment';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartFood)
    private cartFoodRepository: Repository<CartFood>,
    private cartFoodService: CartFoodService,
  ) {}
  public async addToCart(dto: AddToCartDto, userReq: UserJwtDto) {
    try {
      const foodInCart = await this.cartFoodRepository.findOne({
        where: {
          food: { foodID: dto.FoodID },
          cart: { UserID: Number(userReq.id) },
        },
      });

      let cart;
      if (foodInCart) {
        cart = await this.cartRepository.findOne({
          where: { CartID: foodInCart.CartID },
        });
        await this.cartFoodRepository.update(
          { CartID: foodInCart.CartID },
          { Quantity: Number(foodInCart.Quantity) + Number(dto.Quantity) },
        );
      } else {
        cart = await this.cartRepository.findOne({
          where: { UserID: Number(userReq.id) },
        });
        if (!cart) {
          cart = new Cart();
          cart.UserID = Number(userReq.id);
          cart.TotalQuantity = 0;
          cart.CreatedAt = new Date();
          await this.cartRepository.save(cart);
        }
        await this.cartFoodService.addToCartFood({
          CartID: cart.CartID,
          FoodID: dto.FoodID,
          Quantity: dto.Quantity,
        });
      }

      cart.TotalQuantity = Number(cart.TotalQuantity) + Number(dto.Quantity);
      await this.cartRepository.save(cart);

      return cart;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  public async getAllCart(userReq: UserJwtDto) {
    try {
      const cart = await this.cartRepository.findOne({
        where: { UserID: Number(userReq.id) },
      });
      if (!cart) {
        throw new BadRequestException('CART_NOT_FOUND');
      }
      return await this.cartFoodService.getCartFood({ CartID: cart.CartID });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  public async getCartByDate(dto: GetCartByDateDto) {
    try {
      const date = moment(dto.Date).format('YYYY-MM-DD');

      const cart = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.cartFoods', 'cartFood')
        .leftJoinAndSelect('cartFood.food', 'food')
        .where('DATE(cartFood.CreatedAt) = :date', { date: date })
        .getMany();

      return cart;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
