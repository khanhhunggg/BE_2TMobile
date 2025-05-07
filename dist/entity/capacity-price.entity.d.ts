import { Capacity } from './capacity.entity';
export declare class CapacityPrice {
    id: number;
    capacity_id: number;
    price: number;
    discount_price: number;
    created_at: Date;
    updated_at: Date;
    capacity: Capacity;
}
