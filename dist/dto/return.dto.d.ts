import { ReturnType } from '../entity/return.entity';
import { ReturnStatus } from '../entity/return-detail.entity';
export declare class CreateReturnDto {
    orderDetailId: number;
    purchaseDetailId: number;
    adminId?: number;
    customerId: number;
    returnCode?: string;
    type: ReturnType;
    refundAmount?: number;
    reasonId?: number;
    expectedReturnDate?: Date;
    notes?: string;
}
declare const UpdateReturnDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReturnDto>>;
export declare class UpdateReturnDto extends UpdateReturnDto_base {
}
export declare class CreateReturnDetailDto {
    status?: ReturnStatus;
    shippingCode?: string;
    customReason?: string;
    images?: string[];
    quantity: number;
    productCondition?: string;
}
export declare class ReturnResponseDto extends CreateReturnDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    returnDetails: CreateReturnDetailDto[];
}
export {};
