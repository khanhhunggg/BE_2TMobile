import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<import("../entity/order.entity").Order>;
    getAllOrders(): Promise<import("../entity/order.entity").Order[]>;
    getOrderById(id: string): Promise<import("../entity/order.entity").Order>;
    updateOrder(updateOrderDto: UpdateOrderDto): Promise<import("../entity/order.entity").Order>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
}
