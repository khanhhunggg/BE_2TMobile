export declare class CheckoutRequestType {
    orderCode: number;
    amount: number;
    description: string;
    cancelUrl: string;
    returnUrl: string;
    signature?: string;
    items?: {
        name: string;
        quantity: number;
        price: number;
    }[];
    buyerName?: string;
    buyerEmail?: string;
    buyerPhone?: string;
    buyerAddress?: string;
    expiredAt?: number;
}
export declare class WebhookDataDto {
    code: string;
    desc: string;
    success: boolean;
    signature: string;
    data: {
        paymentId: string;
        orderCode: number;
        amount: number;
        description: string;
        transactionTime: string;
        status: string;
        paymentMethod: string;
        accountNumber: string;
        reference: string;
        transactionDateTime: string;
        currency: string;
        paymentChannel: string;
        paymentDestination: string;
        paymentSource: string;
        paymentLinkId: string;
        code: string;
        desc: string;
    };
}
