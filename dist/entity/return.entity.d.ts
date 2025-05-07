import { OrderDetail } from './order-detail.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';
import { ReturnDetail } from './return-detail.entity';
export declare enum ReturnType {
    REFUND = "Refund",
    REPAIR = "Repair",
    REPLACEMENT = "Replacement"
}
export declare class Return {
    id: number;
    orderDetailId: number;
    purchaseDetailId: number;
    adminId: number;
    customerId: number;
    returnCode: string;
    type: ReturnType;
    refundAmount: number;
    reasonId: number;
    createdAt: Date;
    updatedAt: Date;
    orderDetail: OrderDetail;
    purchaseDetail: PurchaseOrderItem;
    returnDetails: ReturnDetail[];
}
