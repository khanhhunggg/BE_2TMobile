import { Order } from './order.entity';
import { ProductDetail } from './product-detail.entity';
import { CartDetail } from './cart-detail.entity';
export declare class OrderDetail {
    id: number;
    order: Order;
    productDetail: ProductDetail;
    cartDetail?: CartDetail;
    quantity: number;
    total_price: number;
}
