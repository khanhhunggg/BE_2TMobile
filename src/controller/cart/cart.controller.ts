import { Controller } from '@nestjs/common';
import { CartService } from 'src/service/cart/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
}
