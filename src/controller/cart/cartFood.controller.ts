import { Controller } from '@nestjs/common';
import { CartFoodService } from 'src/service/cart/cartFood.service';

@Controller('cart-food')
export class CartFoodController {
  constructor(private readonly cartFoodService: CartFoodService) {}
}
