import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartDetail } from 'src/entity/cart-detail.entity';
import { Cart } from 'src/entity/cart.entity';
import { Repository } from 'typeorm';
import {
  CartItemDto,
  CreateCartDto,
  GetCartByUserDto,
  UpdateCartItemDto,
} from '../dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartDetail)
    private readonly cartDetailRepository: Repository<CartDetail>,
  ) {}

  public async createCart(data: CreateCartDto) {
    try {
      if (!data.user_id) {
        throw new BadRequestException({
          message: 'Thông tin giỏ hàng không hợp lệ',
          errors: [
            {
              field: 'user_id',
              message: 'ID người dùng không được để trống',
            },
          ],
        });
      }

      const user = await this.cartRepository.manager.findOne('User', {
        where: { id: data.user_id },
      });

      if (!user) {
        throw new BadRequestException({
          message: 'Thông tin giỏ hàng không hợp lệ',
          errors: [
            {
              field: 'user_id',
              message: `Không tìm thấy người dùng với ID: ${data.user_id}`,
            },
          ],
        });
      }

      const existingCart = await this.cartRepository.findOne({
        where: { user_id: data.user_id },
      });

      if (existingCart) {
        throw new BadRequestException({
          message: 'Thông tin giỏ hàng không hợp lệ',
          errors: [
            {
              field: 'user_id',
              message: 'Người dùng đã có giỏ hàng',
            },
          ],
        });
      }

      const newCart = this.cartRepository.create({
        user_id: data.user_id,
      });

      return await this.cartRepository.save(newCart);
    } catch (error) {
      throw error;
    }
  }

  public async addItemToCart(data: CartItemDto) {
    try {
      const cart = await this.cartRepository.findOne({
        where: { user_id: data.user_id },
      });

      if (!cart) {
        return await this.createCart({ user_id: data.user_id });
      }

      const existingItem = await this.cartDetailRepository.findOne({
        where: {
          cart_id: cart.id,
          product_detail_id: data.product_detail_id,
        },
      });

      if (existingItem) {
        existingItem.quantity += data.quantity;
        return await this.cartDetailRepository.save(existingItem);
      }

      const newItem = this.cartDetailRepository.create({
        cart_id: cart.id,
        product_detail_id: data.product_detail_id,
        quantity: data.quantity,
        price: data.price,
      });

      return await this.cartDetailRepository.save(newItem);
    } catch (error) {
      throw error;
    }
  }

  public async updateCartItem(data: UpdateCartItemDto) {
    try {
      const item = await this.cartDetailRepository.findOne({
        where: {
          id: data.item_id,
          cart_id: data.cart_id,
        },
      });

      if (!item) {
        throw new BadRequestException({
          message: 'Thông tin sản phẩm không hợp lệ',
          errors: [
            {
              field: 'item_id',
              message: `Không tìm thấy sản phẩm với ID: ${data.item_id}`,
            },
          ],
        });
      }

      if (data.quantity !== undefined) {
        item.quantity = data.quantity;
      }
      if (data.price !== undefined) {
        item.price = data.price;
      }

      return await this.cartDetailRepository.save(item);
    } catch (error) {
      throw error;
    }
  }

  public async removeItemFromCart(cartId: number, itemId: number) {
    try {
      const result = await this.cartDetailRepository.delete({
        id: itemId,
        cart_id: cartId,
      });

      if (result.affected === 0) {
        throw new BadRequestException({
          message: 'Thông tin sản phẩm không hợp lệ',
          errors: [
            {
              field: 'item_id',
              message: `Không tìm thấy sản phẩm với ID: ${itemId}`,
            },
          ],
        });
      }

      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  public async getCartByUserId(data: GetCartByUserDto) {
    try {
      const cart = await this.cartRepository.findOne({
        where: { user_id: data.user_id },
        relations: [
          'cartDetails',
          'cartDetails.productDetail',
          'cartDetails.productDetail.product',
        ],
      });

      if (!cart) {
        throw new BadRequestException({
          message: 'Thông tin giỏ hàng không hợp lệ',
          errors: [
            {
              field: 'user_id',
              message: `Không tìm thấy giỏ hàng cho người dùng với ID: ${data.user_id}`,
            },
          ],
        });
      }

      return cart;
    } catch (error) {
      throw error;
    }
  }
}
