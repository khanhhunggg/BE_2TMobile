export declare class VendorResponseDto {
    id?: number;
    vendor_code?: string;
    name?: string;
}
export declare class CreateVendorDto {
    vendor_code: string;
    name: string;
    phone?: string;
    email?: string;
    address?: string;
}
export declare class UpdateVendorDto {
    id: number;
    vendor_code?: string;
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    contact_person_id?: number;
}
export declare class DeleteVendorDto {
    id: number;
}
