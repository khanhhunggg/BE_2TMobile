export declare class CreateReviewDto {
    userId: number;
    productDetailId: number;
    rating: number;
    comment?: string;
}
export declare class UpdateReviewDto {
    id: number;
    rating?: number;
    comment?: string;
    isVerified?: boolean;
}
export declare class GetReviewByIdDto {
    id: number;
}
export declare class GetReviewsByProductDto {
    productDetailId: number;
}
export declare class GetReviewsByUserDto {
    userId: number;
}
export declare class DeleteReviewDto {
    id: number;
}
