import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<import("../entity/order.entity").Order>;
    getAllOrders(): Promise<import("../entity/order.entity").Order[]>;
    getOrderById(id: string): Promise<import("../entity/order.entity").Order>;
    updateOrder(id: string, updateOrderDto: Partial<CreateOrderDto>): Promise<import("../entity/order.entity").Order>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
}
