import { Purchase } from 'src/entity/purchase.entity';
import { PurchaseOrderItem } from 'src/entity/purchase-order-item.entity';
import { Repository } from 'typeorm';
import { CreateVendorBillDto, DeleteVendorBillDto, GetVendorBillByIdDto, SearchVendorBillDto, UpdateVendorBillDto } from '../dto/vendor-bill.dto';
import { ProductDetail } from '../entity/product-detail.entity';
export declare class VendorBillService {
    private purchaseRepository;
    private purchaseOrderItemRepository;
    private readonly productDetailRepository;
    constructor(purchaseRepository: Repository<Purchase>, purchaseOrderItemRepository: Repository<PurchaseOrderItem>, productDetailRepository: Repository<ProductDetail>);
    doCreateVendorBill(data: CreateVendorBillDto): Promise<Purchase>;
    doGetAllVendorBill(searchParams: SearchVendorBillDto): Promise<{
        data: Purchase[];
        pagination: {
            total: number;
            page: number;
            size: number;
            total_pages: number;
        };
    }>;
    doGetVendorBillById(data: GetVendorBillByIdDto): Promise<Purchase>;
    doUpdateVendorBill(data: UpdateVendorBillDto): Promise<Purchase>;
    doDeleteVendorBill(data: DeleteVendorBillDto): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
}
