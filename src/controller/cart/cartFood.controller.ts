import {
  Controller,
  Post,
  UseGuards,
  Body,
  Put,
  Query,
  Delete,
  Get,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  AddToCartFoodDto,
  DeleteCartFoodDto,
  UpdateCartFoodDto,
  GetCartFoodDto,
} from 'src/database/dto/cart/cartfood.dto';
import { JwtAuthGuard } from 'src/database/dto/user/jwt-auth.guard';
import { CartFoodService } from 'src/service/cart/cartFood.service';

@Controller('cart-food')
export class CartFoodController {
  constructor(private readonly cartFoodService: CartFoodService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add food to cart' })
  public async addToCartFood(@Query() dto: AddToCartFoodDto) {
    return this.cartFoodService.addToCartFood(dto);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update food in cart' })
  public async updateCartFood(@Query() dto: UpdateCartFoodDto) {
    return this.cartFoodService.updateCartFood(dto);
  }

  @Get('get')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get food in cart' })
  public async getCartFood(@Query() dto: GetCartFoodDto) {
    return this.cartFoodService.getCartFood(dto);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete food from cart' })
  public async deleteCartFood(@Query() dto: DeleteCartFoodDto) {
    return this.cartFoodService.deleteCartFood(dto);
  }
}
