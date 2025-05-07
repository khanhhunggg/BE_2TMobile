import { Repository } from 'typeorm';
import { Vendor } from '../entity/vendor.entity';
import { VendorResponseDto } from '../dto/vendor-response.dto';
import { CreateVendorDto, UpdateVendorDto, DeleteVendorDto } from '../dto/vendor-response.dto';
export declare class VendorService {
    private readonly vendorRepository;
    constructor(vendorRepository: Repository<Vendor>);
    doCreateVendor(data: CreateVendorDto): Promise<{
        id: number;
        vendor_code: string;
        name: string;
        phone: string;
        email: string;
        address: string;
    }>;
    doUpdateVendor(data: UpdateVendorDto): Promise<{
        id: number;
        vendor_code: string;
        name: string;
        phone: string;
        email: string;
        address: string;
    }>;
    doDeleteVendor(data: DeleteVendorDto): Promise<{
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
