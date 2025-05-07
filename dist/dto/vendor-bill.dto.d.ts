export declare class VendorBillItemDto {
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
export declare class CreateVendorBillDto {
    lotCode?: string;
    itemType?: string;
    vendorId: number;
    paymentMethod?: string;
    orderDate?: string;
    orderTime?: string;
    status?: string;
    note?: string;
    items: VendorBillItemDto[];
}
export declare class GetVendorBillByIdDto {
    id: number;
}
export declare class SearchVendorBillDto {
    lotCode?: string;
    itemType?: string;
    vendorId?: number;
    status?: string;
    page?: number;
    size?: number;
}
export declare class UpdateVendorBillDto extends CreateVendorBillDto {
    id: number;
}
export declare class DeleteVendorBillDto {
    id: number;
}
