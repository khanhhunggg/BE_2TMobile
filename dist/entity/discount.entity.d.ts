export declare enum DiscountType {
    PERCENTAGE = "percentage",
    FIXED_AMOUNT = "fixed_amount"
}
export declare class Discount {
    id: number;
    title: string;
    description: string;
    discount_type: DiscountType;
    discount_value: number;
    start_date: Date;
    end_date: Date;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
