import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { Repository } from 'typeorm';
import { CartFoodService } from './cartFood.service';
import { Cart } from 'src/database/entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private cartFoodService: CartFoodService,
  ) {}
  public async addToCart(userReq: UserJwtDto, foodId: number) {
    try {
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
}
