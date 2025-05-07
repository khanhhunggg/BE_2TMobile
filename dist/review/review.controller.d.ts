import { CreateReviewDto, DeleteReviewDto, GetReviewByIdDto, GetReviewsByProductDto, GetReviewsByUserDto, UpdateReviewDto } from '../dto/review.dto';
import { ReviewService } from './review.service';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    CreateReview(review: CreateReviewDto): Promise<import("../entity/review.entity").Review>;
    GetReviewById(data: GetReviewByIdDto): Promise<import("../entity/review.entity").Review>;
    GetReviewsByProduct(data: GetReviewsByProductDto): Promise<{
        reviews: import("../entity/review.entity").Review[];
        statistics: {
            totalReviews: number;
            averageRating: number;
            ratingDistribution: {
                1: number;
                2: number;
                3: number;
                4: number;
                5: number;
            };
        };
    }>;
    GetReviewsByUser(data: GetReviewsByUserDto): Promise<{
        reviews: import("../entity/review.entity").Review[];
        totalReviews: number;
    }>;
    UpdateReview(data: UpdateReviewDto): Promise<import("../entity/review.entity").Review>;
    DeleteReview(data: DeleteReviewDto): Promise<{
        message: string;
        deletedReviewId: number;
    }>;
}
