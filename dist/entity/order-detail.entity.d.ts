import { CartDetail } from './cart-detail.entity';
import { Order } from './order.entity';
import { ProductDetail } from './product-detail.entity';
export declare class OrderDetail {
    id: number;
    order: Order;
    productDetail: ProductDetail;
    cartDetail?: CartDetail;
    quantity: number;
    price: number;
}
