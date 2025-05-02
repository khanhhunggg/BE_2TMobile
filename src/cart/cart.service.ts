import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartDetail } from 'src/entity/cart-detail.entity';
import { Cart } from 'src/entity/cart.entity';
import { ProductDetail } from 'src/entity/product-detail.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartDetail)
    private cartDetailRepository: Repository<CartDetail>,
    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,
  ) {}

  public async doCreateCart(data: CreateCartDto) {
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
}
