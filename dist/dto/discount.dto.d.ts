import { DiscountType } from '../entity/discount.entity';
export declare class CreateDiscountDto {
    title: string;
    description?: string;
    discount_type: DiscountType;
    discount_value: number;
    start_date: string;
    end_date: string;
    is_active?: boolean;
}
export declare class UpdateDiscountDto {
    id: number;
    title?: string;
    description?: string;
    discount_type?: DiscountType;
    discount_value?: number;
    start_date?: string;
    end_date?: string;
    is_active?: boolean;
}
export declare class GetDiscountByIdDto {
    id: number;
}
export declare class SearchDiscountDto {
    title?: string;
    discount_type?: DiscountType;
    is_active?: boolean;
    page?: number;
    size?: number;
}
export declare class DeleteDiscountDto {
    id: number;
}
export declare class AssignDiscountToUserDto {
    discount_id: number;
    user_id: number;
}
export declare class RemoveDiscountFromUserDto {
    discount_id: number;
    user_id: number;
}
