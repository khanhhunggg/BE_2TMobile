import { OrderService } from './order.service';
import { CreateOrderDto, SearchOrderDto, UpdateOrderDto } from '../dto/order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<import("../entity/order.entity").Order>;
    getAllOrders(searchParams: SearchOrderDto): Promise<{
        data: import("../entity/order.entity").Order[];
        pagination: {
            total: number;
            page: number;
            size: number;
            total_pages: number;
        };
    }>;
    getOrderById(id: string): Promise<import("../entity/order.entity").Order>;
    updateOrder(updateOrderDto: UpdateOrderDto): Promise<import("../entity/order.entity").Order>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
}
