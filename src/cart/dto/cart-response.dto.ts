import { ProductDetail } from 'src/entity/product-detail.entity';

export class CartItemDto {
  id: number;
  product_detail_id: number;
  quantity: number;
  productDetail: ProductDetail;
  totalPrice: number;
}

export class CartResponseDto {
  id: number;
  user_id: number;
  items: CartItemDto[];
  totalItems: number;
  totalPrice: number;
}
