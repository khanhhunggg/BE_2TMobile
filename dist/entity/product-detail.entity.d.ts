import { Capacity } from './capacity.entity';
import { Color } from './color.entity';
import { Product } from './product.entity';
import { Review } from './review.entity';
export declare class ProductDetail {
    id: number;
    product_id: number;
    capacity_id: number;
    stock_quantity: number;
    serial_number: string;
    import_price: string;
    selling_price: string;
    created_at: Date;
    updated_at: Date;
    product: Product;
    capacity: Capacity;
    color_id: number;
    color: Color;
    reviews: Review[];
}
