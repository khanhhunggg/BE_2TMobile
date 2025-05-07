import { Product } from './product.entity';
export declare class Image {
    id: number;
    productId: number;
    imageUrl: string;
    isThumbnail: boolean;
    sortOrder: number;
    product: Product;
}
