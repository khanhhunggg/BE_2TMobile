import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartFood } from 'src/database/entity/cart/cartItem.entity';

export class CartFoodService {
  constructor(
    @InjectRepository(CartFood)
    private cartFoodRepository: Repository<CartFood>,
  ) {}
  public async addToCartFood(cartFood: CartFood) {
    try {
    } catch (error) {
      throw new Error(error);
    }
  }
}
