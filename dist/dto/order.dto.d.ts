import { PaymentMethod, OrderStatus } from '../entity/order.entity';
export declare class CreateOrderDetailDto {
    product_detail_id: number;
    cart_detail_id?: number;
    quantity: number;
    total_price: number;
}
export declare class CreateOrderDto {
    user_id: number;
    payment_method: PaymentMethod;
    expected_delivery_date?: Date;
    status?: OrderStatus;
    order_details: CreateOrderDetailDto[];
}
