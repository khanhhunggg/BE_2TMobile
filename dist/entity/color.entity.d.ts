import { ProductDetail } from './product-detail.entity';
export declare class Color {
    id: number;
    name: string;
    color_code: string;
    productDetails: ProductDetail[];
    created_at: Date;
    updated_at: Date;
}
