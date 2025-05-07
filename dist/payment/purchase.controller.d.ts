import { CreatePaymentLinkDto, DeletePaymentDto, GetPaymentByIdDto, SearchPaymentDto, UpdatePaymentDto } from 'src/dto/payment.dto';
import { PurchaseService } from './purchase.service';
export declare class PurchaseController {
    private readonly purchaseService;
    constructor(purchaseService: PurchaseService);
    CreatePayment(data: CreatePaymentLinkDto): Promise<import("../entity/payment.entity").Payment>;
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
