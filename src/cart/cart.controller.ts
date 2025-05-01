import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartResponseDto } from './dto/cart-response.dto';

@Controller('cart')
// @UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(
    @User('id') userId: number,
    @Body() addToCartDto: AddToCartDto,
  ) {
    return this.cartService.addProductToCart(userId, addToCartDto);
  }

  @Get()
  async getCart(@User('id') userId: number): Promise<CartResponseDto> {
    return this.cartService.getCartDetails(userId);
  }
}
