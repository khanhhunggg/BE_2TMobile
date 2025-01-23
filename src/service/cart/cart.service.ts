import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cart } from 'src/database/entity/cart.entity';
import { Food } from 'src/database/entity/food.entity';
import { User } from 'src/database/entity/user.entity';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { CartFoodService } from './cartFood.service';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(CartFood)
    private cartFoodRepository: Repository<CartFood>,
  ) {}
  public async addToCart(userReq: UserJwtDto, foodId: number) {
    try {
    } catch (error) {
      throw new Error(error);
    }
  }
}
