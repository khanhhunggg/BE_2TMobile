import { VendorService } from './vendor.service';
import { VendorResponseDto } from '../dto/vendor-response.dto';
import { CreateVendorDto, UpdateVendorDto, DeleteVendorDto } from '../dto/vendor-response.dto';
export declare class VendorController {
    private readonly vendorService;
    constructor(vendorService: VendorService);
    createVendor(data: CreateVendorDto): Promise<{
        id: number;
        vendor_code: string;
        name: string;
        phone: string;
        email: string;
        address: string;
    }>;
    updateVendor(data: UpdateVendorDto): Promise<{
        id: number;
        vendor_code: string;
        name: string;
        phone: string;
        email: string;
        address: string;
    }>;
    deleteVendor(data: DeleteVendorDto): Promise<{
        message: string;
    }>;
    getAllVendors(data: VendorResponseDto): Promise<{
        id: number;
        vendor_code: string;
        name: string;
        phone: string;
        email: string;
        address: string;
    }[]>;
    getVendorById(id: VendorResponseDto): Promise<{
        id: number;
        vendor_code: string;
        name: string;
        phone: string;
        email: string;
        address: string;
    }>;
}
