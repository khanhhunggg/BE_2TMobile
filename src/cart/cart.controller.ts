import { Body, Controller, Post } from '@nestjs/common';
import { Cart } from 'src/entity/cart.entity';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
// @UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create')
  async createCart(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartService.doCreateCart(createCartDto);
  }
}
