import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
import { CartDetail } from 'src/entity/cart-detail.entity';
import { ProductDetail } from 'src/entity/product-detail.entity';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartResponseDto, CartItemDto } from './dto/cart-response.dto';

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

  public async getOrCreateCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { user_id: userId },
    });
    if (!cart) {
      cart = await this.cartRepository.save({ user_id: userId });
    }
    return cart;
  }

  public async addProductToCart(
    userId: number,
    addToCartDto: AddToCartDto,
  ): Promise<CartDetail> {
    const cart = await this.getOrCreateCart(userId);

    const productDetail = await this.productDetailRepository.findOne({
      where: { id: addToCartDto.product_detail_id },
    });
    if (!productDetail) {
      throw new NotFoundException('Product detail not found');
    }

    let cartDetail = await this.cartDetailRepository.findOne({
      where: {
        cart_id: cart.id,
        product_detail_id: addToCartDto.product_detail_id,
      },
    });

    if (cartDetail) {
      cartDetail.quantity += addToCartDto.quantity;
    } else {
      cartDetail = this.cartDetailRepository.create({
        cart_id: cart.id,
        product_detail_id: addToCartDto.product_detail_id,
        quantity: addToCartDto.quantity,
      });
    }

    return this.cartDetailRepository.save(cartDetail);
  }

  public async getCartDetails(userId: number): Promise<CartResponseDto> {
    const cart = await this.cartRepository.findOne({
      where: { user_id: userId },
      relations: [
        'cartDetails',
        'cartDetails.productDetail',
        'cartDetails.productDetail.product',
      ],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItems: CartItemDto[] = await Promise.all(
      cart.cartDetails.map(async (detail) => {
        const productDetail = await this.productDetailRepository.findOne({
          where: { id: detail.product_detail_id },
          relations: ['product'],
        });

        const totalPrice = Number(detail.price) * detail.quantity;

        return {
          id: detail.id,
          product_detail_id: detail.product_detail_id,
          quantity: detail.quantity,
          productDetail: productDetail,
          totalPrice: totalPrice,
        };
      }),
    );

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );

    return {
      id: cart.id,
      user_id: cart.user_id,
      items: cartItems,
      totalItems,
      totalPrice,
    };
  }
}
