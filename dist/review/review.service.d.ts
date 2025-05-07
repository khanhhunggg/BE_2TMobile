import { Repository } from 'typeorm';
import { Review } from '../entity/review.entity';
import { User } from '../entity/user.entity';
import { ProductDetail } from '../entity/product-detail.entity';
import { CreateReviewDto, DeleteReviewDto, GetReviewByIdDto, GetReviewsByProductDto, GetReviewsByUserDto, UpdateReviewDto } from '../dto/review.dto';
export declare class ReviewService {
    private reviewRepository;
    private userRepository;
    private productDetailRepository;
    constructor(reviewRepository: Repository<Review>, userRepository: Repository<User>, productDetailRepository: Repository<ProductDetail>);
    doCreateReview(review: CreateReviewDto): Promise<Review>;
    doGetReviewById(data: GetReviewByIdDto): Promise<Review>;
    doGetReviewsByProduct(data: GetReviewsByProductDto): Promise<{
        reviews: Review[];
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
    doGetReviewsByUser(data: GetReviewsByUserDto): Promise<{
        reviews: Review[];
        totalReviews: number;
    }>;
    doUpdateReview(data: UpdateReviewDto): Promise<Review>;
    doDeleteReview(data: DeleteReviewDto): Promise<{
        message: string;
        deletedReviewId: number;
    }>;
    private calculateRatingDistribution;
}
