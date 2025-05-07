import { PaginationResponseDto } from 'src/common/common.dto';
export declare enum PurchaseStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare enum PaymentMethod {
    CASH = "CASH",
    BANK_TRANSFER = "BANK_TRANSFER",
    CREDIT_CARD = "CREDIT_CARD"
}
export declare class PurchaseItemDto {
    ProductId: number;
    Quantity: number;
    UnitPrice: number;
}
export declare class CreatePurchaseDto {
    LotCode?: string;
    ItemType?: string;
    VendorId: number;
    PaymentMethod?: PaymentMethod;
    OrderDate?: string;
    OrderTime?: string;
    Status?: PurchaseStatus;
    Note?: string;
    Items: PurchaseItemDto[];
}
export declare class UpdatePurchaseDto {
    Id: number;
    LotCode?: string;
    ItemType?: string;
    VendorId?: number;
    PaymentMethod?: PaymentMethod;
    OrderDate?: string;
    OrderTime?: string;
    Status?: PurchaseStatus;
    Note?: string;
    Items?: PurchaseItemDto[];
}
export declare class GetPurchaseByIdDto {
    Id: number;
}
export declare class GetPurchaseByVendorDto extends PaginationResponseDto {
    VendorId: number;
}
export declare class GetPurchaseByDateRangeDto extends PaginationResponseDto {
    StartDate: string;
    EndDate: string;
}
export declare class DeletePurchaseDto {
    Id: number;
}
export declare class GetPurchaseListDto {
    page?: number;
    size?: number;
    search?: string;
    status?: PurchaseStatus;
    vendorId?: number;
    startDate?: Date;
    endDate?: Date;
    sortBy?: string;
    sortDirection?: string;
}
