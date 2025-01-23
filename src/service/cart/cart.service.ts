import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from 'src/database/entity/cart/cart.entity';
import { Food } from 'src/database/entity/food.entity';
import { User } from 'src/database/entity/user.entity';
import { UserJwtDto } from 'src/database/dto/user/user.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  public async addToCart(userReq: UserJwtDto, foodId: number) {
    try {
    } catch (error) {
      throw new Error(error);
    }
  }
}
