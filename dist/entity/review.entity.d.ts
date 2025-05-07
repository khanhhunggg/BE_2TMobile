import { User } from './user.entity';
import { ProductDetail } from './product-detail.entity';
export declare class Review {
    id: number;
    userId: number;
    productDetailId: number;
    rating: number;
    comment: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    productDetail: ProductDetail;
}
