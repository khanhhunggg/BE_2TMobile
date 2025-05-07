import { Purchase } from './purchase.entity';
import { Product } from './product.entity';
export declare class PurchaseOrderItem {
    id: number;
    purchaseOrderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    purchase: Purchase;
    product: Product;
}
