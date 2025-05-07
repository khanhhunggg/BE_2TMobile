import { Vendor } from './vendor.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';
export declare class Purchase {
    id: number;
    lotCode: string;
    itemType: string;
    vendorId: number;
    vendor: Vendor;
    paymentMethod: string;
    orderDate: Date;
    orderTime: string;
    status: string;
    note: string;
    purchaseOrderItems: PurchaseOrderItem[];
}
