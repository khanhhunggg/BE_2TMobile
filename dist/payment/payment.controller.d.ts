import { PaymentService } from './payment.service';
import { CreatePaymentLinkDto, PaymentLinkResponseDto, DeletePaymentDto, GetPaymentByIdDto, SearchPaymentDto, UpdatePaymentDto } from 'src/dto/payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    doCreatePaymentUrl(createPaymentLinkDto: CreatePaymentLinkDto): Promise<PaymentLinkResponseDto>;
    getPaymentInfo(orderId: number): Promise<any>;
    CreatePaymentLink(data: CreatePaymentLinkDto): Promise<any>;
    GetAllPayment(searchParams: SearchPaymentDto): Promise<{
        data: import("../entity/payment.entity").Payment[];
        pagination: {
            total: number;
            page: number;
            size: number;
            total_pages: number;
        };
    }>;
    GetPaymentById(data: GetPaymentByIdDto): Promise<import("../entity/payment.entity").Payment>;
    UpdatePayment(data: UpdatePaymentDto): Promise<import("../entity/payment.entity").Payment>;
    DeletePayment(data: DeletePaymentDto): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
}
