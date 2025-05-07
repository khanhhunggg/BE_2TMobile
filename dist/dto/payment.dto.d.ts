export declare class PaymentLinkResponseDto {
    checkoutUrl: string;
}
export declare class CreatePaymentLinkDto {
    orderId: number;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    buyerAddress: string;
    expiredAt?: number;
}
export declare class GetPaymentByIdDto {
    id: number;
}
export declare class SearchPaymentDto {
    orderId?: number;
    buyerName?: string;
    buyerEmail?: string;
    buyerPhone?: string;
    page?: number;
    size?: number;
    sort_by?: string;
    order?: 'ASC' | 'DESC';
}
export declare class UpdatePaymentDto {
    id: number;
    orderId: number;
    buyerName?: string;
    buyerEmail?: string;
    buyerPhone?: string;
    buyerAddress?: string;
}
export declare class DeletePaymentDto {
    id: number;
}
