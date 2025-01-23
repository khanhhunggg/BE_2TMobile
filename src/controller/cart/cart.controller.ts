import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserReq } from 'src/common/user.decorator';
import { AddToCartDto, GetCartByDateDto } from 'src/database/dto/cart/cart.dto';
import { JwtAuthGuard } from 'src/database/dto/user/jwt-auth.guard';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { CartService } from 'src/service/cart/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('get-all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all cart' })
  public async getAllCart(@UserReq() userRep: UserJwtDto) {
    return this.cartService.getAllCart(userRep);
  }

  @Post('add')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add food to cart' })
  public async addToCart(
    @Query() dto: AddToCartDto,
    @UserReq() userRep: UserJwtDto,
  ) {
    return this.cartService.addToCart(dto, userRep);
  }
  @Get('get-by-date')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get cart by date' })
  public async getCartByDate(@Query() dto: GetCartByDateDto) {
    return this.cartService.getCartByDate(dto);
  }
}
