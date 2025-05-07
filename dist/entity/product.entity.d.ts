import { Image } from './image.entity';
import { ProductDetail } from './product-detail.entity';
import { Specs } from './specs.entity';
import { Vendor } from './vendor.entity';
export declare class Product {
    id: number;
    name: string;
    model: string;
    description: string;
    warranty_period: number;
    release_year: number;
    is_featured: boolean;
    status: 'Active' | 'Inactive';
    created_at: Date;
    updated_at: Date;
    vendor_id: number;
    vendor: Vendor;
    productDetails: ProductDetail[];
    specs: Specs[];
    images: Image[];
}
