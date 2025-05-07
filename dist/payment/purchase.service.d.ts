import { CreatePaymentLinkDto, GetPaymentByIdDto, SearchPaymentDto, UpdatePaymentDto, DeletePaymentDto } from 'src/dto/payment.dto';
import { Payment } from 'src/entity/payment.entity';
import { Repository } from 'typeorm';
export declare class PurchaseService {
    private paymentRepository;
    constructor(paymentRepository: Repository<Payment>);
    doCreatePayment(data: CreatePaymentLinkDto): Promise<Payment>;
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
