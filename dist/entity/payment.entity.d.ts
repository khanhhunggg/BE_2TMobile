import { Order } from './order.entity';
export declare class Payment {
    id: number;
    orderId: number;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    buyerAddress: string;
    expiredAt: number;
    createdAt: Date;
    updatedAt: Date;
    order: Order;
}
