import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Order } from 'src/entity/order.entity';
import { Payment } from 'src/entity/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentLinkDto, DeletePaymentDto, GetPaymentByIdDto, SearchPaymentDto, UpdatePaymentDto } from 'src/dto/payment.dto';
export declare class PaymentService {
    private orderRepository;
    private paymentRepository;
    private httpService;
    private configService;
    constructor(orderRepository: Repository<Order>, paymentRepository: Repository<Payment>, httpService: HttpService, configService: ConfigService);
    createPaymentLink(createPaymentLinkDto: CreatePaymentLinkDto): Promise<any>;
    getPaymentRequestInfo(orderId: number): Promise<any>;
    doGetAllPayment(searchParams: SearchPaymentDto): Promise<{
        data: Payment[];
        pagination: {
            total: number;
            page: number;
            size: number;
            total_pages: number;
        };
    }>;
    doGetPaymentById(data: GetPaymentByIdDto): Promise<Payment>;
    doUpdatePayment(data: UpdatePaymentDto): Promise<Payment>;
    doDeletePayment(data: DeletePaymentDto): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
}
