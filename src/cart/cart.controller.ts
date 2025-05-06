import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CartItemDto,
  CreateCartItemDto,
  DeleteCartItemDto,
  GetCartByUserDto,
  UpdateCartItemDto,
} from '../dto/cart.dto';
import { CartService } from './cart.service';

@Controller('cart')
@ApiTags('Giỏ hàng')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // @Post('create-cart')
  // @ApiOperation({ summary: 'Tạo giỏ hàng' })
  // public async CreateCart(@Body() data: CreateCartItemDto) {
  //   return await this.cartService.createCart(data);
  // }

  @Get('get-cart-by-user')
  @ApiOperation({ summary: 'Lấy giỏ hàng theo user' })
  public async GetCartByUser(@Query() data: GetCartByUserDto) {
    return await this.cartService.getCartByUserId(data);
  }

  @Post('add-item-to-cart')
  @ApiOperation({ summary: 'Thêm sản phẩm vào giỏ hàng' })
  public async AddItemToCart(@Body() data: CartItemDto) {
    return await this.cartService.addItemToCart(data);
  }

  @Put('update-cart-item')
  @ApiOperation({ summary: 'Cập nhật sản phẩm trong giỏ hàng' })
  public async UpdateCartItem(@Body() data: UpdateCartItemDto) {
    return await this.cartService.updateCartItem(data);
  }

  @Delete('delete-cart-item')
  @ApiOperation({ summary: 'Xóa sản phẩm khỏi giỏ hàng' })
  public async DeleteCartItem(@Query() data: DeleteCartItemDto) {
    return await this.cartService.removeItemFromCart(
      data.cart_id,
      data.item_id,
    );
  }
}
