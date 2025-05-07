import { Product } from './product.entity';
export declare class Vendor {
    id: number;
    vendorCode: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}
