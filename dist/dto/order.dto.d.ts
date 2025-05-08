import { PaymentMethod, OrderStatus } from '../entity/order.entity';
export declare class CreateOrderDetailDto {
    product_detail_id: number;
    cart_detail_id?: number;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    user_id: number;
    payment_method: PaymentMethod;
    expected_delivery_date?: Date;
    status?: OrderStatus;
    order_details: CreateOrderDetailDto[];
}
export declare class UpdateOrderDto extends CreateOrderDto {
    id: number;
}
export declare class SearchOrderDto {
    page?: number;
    size?: number;
    status?: OrderStatus;
    payment_method?: PaymentMethod;
    sort_by?: string;
    sort_order?: 'ASC' | 'DESC';
}
