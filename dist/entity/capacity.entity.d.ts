import { CapacityPrice } from './capacity-price.entity';
export declare enum CapacityUnit {
    MB = "MB",
    GB = "GB",
    TB = "TB"
}
export declare class Capacity {
    id: number;
    value: number;
    unit: CapacityUnit;
    display_name: string;
    created_at: Date;
    updated_at: Date;
    price: CapacityPrice;
}
