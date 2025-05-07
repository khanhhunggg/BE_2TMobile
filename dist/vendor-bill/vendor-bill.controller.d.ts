import { VendorBillService } from './vendor-bill.service';
import { CreateVendorBillDto, DeleteVendorBillDto, GetVendorBillByIdDto, SearchVendorBillDto, UpdateVendorBillDto } from '../dto/vendor-bill.dto';
export declare class VendorBillController {
    private readonly vendorBillService;
    constructor(vendorBillService: VendorBillService);
    createVendorBill(data: CreateVendorBillDto): Promise<import("../entity/purchase.entity").Purchase>;
    getAllVendorBill(searchParams: SearchVendorBillDto): Promise<{
        data: import("../entity/purchase.entity").Purchase[];
        pagination: {
            total: number;
            page: number;
            size: number;
            total_pages: number;
        };
    }>;
    getVendorBillById(data: GetVendorBillByIdDto): Promise<import("../entity/purchase.entity").Purchase>;
    updateVendorBill(data: UpdateVendorBillDto): Promise<import("../entity/purchase.entity").Purchase>;
    deleteVendorBill(data: DeleteVendorBillDto): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
}
