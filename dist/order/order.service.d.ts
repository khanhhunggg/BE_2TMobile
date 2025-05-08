import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { OrderDetail } from '../entity/order-detail.entity';
import { CreateOrderDto, UpdateOrderDto, SearchOrderDto } from '../dto/order.dto';
export declare class OrderService {
    private orderRepository;
    private orderDetailRepository;
    constructor(orderRepository: Repository<Order>, orderDetailRepository: Repository<OrderDetail>);
    doCreateOrder(orderData: CreateOrderDto): Promise<Order>;
    doGetAllOrders(searchParams: SearchOrderDto): Promise<{
        data: Order[];
        pagination: {
            total: number;
            page: number;
            size: number;
            total_pages: number;
        };
    }>;
    doGetOrderById(id: number): Promise<Order>;
    doUpdateOrder(updateData: UpdateOrderDto): Promise<Order>;
    doDeleteOrder(id: number): Promise<{
        message: string;
    }>;
}
