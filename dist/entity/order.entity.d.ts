import { User } from './user.entity';
import { OrderDetail } from './order-detail.entity';
export declare enum PaymentMethod {
    BANKING = "BANKING",
    CAST = "CAST"
}
export declare enum OrderStatus {
    PENDING = "PENDING",
    DELIVERY = "DELIVERY",
    COMPLETED = "COMPLETED",
    CANCLED = "CANCLED",
    RETURN = "RETURN",
    RETURNED = "RETURNED"
}
export declare class Order {
    id: number;
    user: User;
    payment_method: PaymentMethod;
    order_date: Date;
    expected_delivery_date: Date;
    status: OrderStatus;
    delivered_date: Date;
    orderDetails: OrderDetail[];
}
