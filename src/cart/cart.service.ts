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
          message: 'Lỗi khi tạo giỏ hàng',
          errors: [
            {
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
          message: 'Lỗi khi tạo giỏ hàng',
          errors: [
            {
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
          message: 'Lỗi khi tạo giỏ hàng',
          errors: [
            {
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
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi tạo giỏ hàng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async addItemToCart(data: CartItemDto) {
    try {
      if (
        !data.user_id ||
        !data.product_detail_id ||
        !data.quantity ||
        data.quantity <= 0
      ) {
        throw new BadRequestException({
          message: 'Lỗi khi thêm sản phẩm vào giỏ hàng',
          errors: [
            {
              message:
                'Vui lòng cung cấp đầy đủ thông tin sản phẩm và số lượng hợp lệ',
            },
          ],
        });
      }

      const cart = await this.cartRepository.findOne({
        where: { user_id: data.user_id },
      });

      if (!cart) {
        const newCart = await this.createCart({ user_id: data.user_id });
        const newItem = this.cartDetailRepository.create({
          cart_id: newCart.id,
          product_detail_id: data.product_detail_id,
          quantity: data.quantity,
          price: data.price,
        });
        return await this.cartDetailRepository.save(newItem);
      }

      const existingItem = await this.cartDetailRepository.findOne({
        where: {
          cart_id: cart.id,
          product_detail_id: data.product_detail_id,
        },
      });

      if (existingItem) {
        existingItem.quantity += data.quantity;
        if (existingItem.quantity <= 0) {
          await this.cartDetailRepository.remove(existingItem);
          return {
            message: 'Sản phẩm đã được xóa khỏi giỏ hàng do số lượng bằng 0',
          };
        }
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
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi thêm sản phẩm vào giỏ hàng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async updateCartItem(data: UpdateCartItemDto) {
    try {
      if (
        !data.item_id ||
        !data.cart_id ||
        !data.quantity ||
        data.quantity <= 0
      ) {
        throw new BadRequestException({
          message: 'Lỗi khi cập nhật giỏ hàng',
          errors: [
            {
              message: 'Vui lòng cung cấp đầy đủ thông tin và số lượng hợp lệ',
            },
          ],
        });
      }

      const item = await this.cartDetailRepository.findOne({
        where: {
          id: data.item_id,
          cart_id: data.cart_id,
        },
      });

      if (!item) {
        throw new BadRequestException({
          message: 'Lỗi khi cập nhật giỏ hàng',
          errors: [
            {
              message: `Không tìm thấy sản phẩm với ID: ${data.item_id}`,
            },
          ],
        });
      }

      if (data.quantity <= 0) {
        await this.cartDetailRepository.remove(item);
        return {
          message: 'Sản phẩm đã được xóa khỏi giỏ hàng do số lượng bằng 0',
        };
      }

      const updateData: Partial<CartDetail> = {};

      // Only update fields that have changed
      if (data.quantity !== undefined && data.quantity !== item.quantity) {
        updateData.quantity = data.quantity;
      }
      if (
        data.price !== undefined &&
        Number(data.price) > 0 &&
        data.price !== item.price
      ) {
        updateData.price = data.price;
      }

      // Only perform update if there are actual changes
      if (Object.keys(updateData).length > 0) {
        await this.cartDetailRepository.update(data.item_id, updateData);
        return await this.cartDetailRepository.findOne({
          where: { id: data.item_id },
        });
      }

      return item;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi cập nhật giỏ hàng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async removeItemFromCart(cartId: number, itemId: number) {
    try {
      if (!cartId || !itemId) {
        throw new BadRequestException({
          message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng',
          errors: [
            {
              message: 'Vui lòng cung cấp đầy đủ thông tin cart_id và item_id',
            },
          ],
        });
      }

      const item = await this.cartDetailRepository.findOne({
        where: {
          id: itemId,
          cart_id: cartId,
        },
      });

      if (!item) {
        throw new BadRequestException({
          message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng',
          errors: [
            {
              message: `Không tìm thấy sản phẩm với ID: ${itemId}`,
            },
          ],
        });
      }

      await this.cartDetailRepository.remove(item);
      return { message: 'Sản phẩm đã được xóa khỏi giỏ hàng thành công' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async getCartByUserId(data: GetCartByUserDto) {
    try {
      if (!data.user_id) {
        throw new BadRequestException({
          message: 'Lỗi khi lấy thông tin giỏ hàng',
          errors: [
            {
              message: 'ID người dùng không được để trống',
            },
          ],
        });
      }

      const cart = await this.cartRepository.findOne({
        where: { user_id: data.user_id },
        relations: [
          'cartDetails',
          'cartDetails.productDetail',
          'cartDetails.productDetail.product',
        ],
      });

      if (!cart) {
        return { message: 'Giỏ hàng trống', cartDetails: [] };
      }

      return cart;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi lấy thông tin giỏ hàng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }
}
