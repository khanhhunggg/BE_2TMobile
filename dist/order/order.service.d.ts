import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { OrderDetail } from '../entity/order-detail.entity';
import { CreateOrderDto } from '../dto/order.dto';
export declare class OrderService {
    private orderRepository;
    private orderDetailRepository;
    constructor(orderRepository: Repository<Order>, orderDetailRepository: Repository<OrderDetail>);
    doCreateOrder(orderData: CreateOrderDto): Promise<Order>;
    doGetAllOrders(): Promise<Order[]>;
    doGetOrderById(id: number): Promise<Order>;
    doUpdateOrder(id: number, updateData: Partial<CreateOrderDto>): Promise<Order>;
    doDeleteOrder(id: number): Promise<{
        message: string;
    }>;
}
