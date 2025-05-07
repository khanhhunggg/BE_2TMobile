import { Cart } from './cart.entity';
import { ProductDetail } from './product-detail.entity';
import { OrderDetail } from './order-detail.entity';
export declare class CartDetail {
    id: number;
    cart_id: number;
    product_detail_id: number;
    quantity: number;
    price: string;
    cart: Cart;
    productDetail: ProductDetail;
    orderDetails: OrderDetail[];
    created_at: Date;
}
