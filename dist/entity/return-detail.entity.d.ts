import { Return } from './return.entity';
export declare enum ReturnStatus {
    PENDING = "Pending",
    APPROVED = "Approved",
    REJECTED = "Rejected",
    SHIPPING = "Shipping",
    COMPLETED = "Completed"
}
export declare class ReturnDetail {
    id: number;
    returnId: number;
    status: ReturnStatus;
    shippingCode: string;
    customReason: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    return: Return;
}
