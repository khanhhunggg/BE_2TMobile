"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("../entity/review.entity");
const user_entity_1 = require("../entity/user.entity");
const product_detail_entity_1 = require("../entity/product-detail.entity");
let ReviewService = class ReviewService {
    constructor(reviewRepository, userRepository, productDetailRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.productDetailRepository = productDetailRepository;
    }
    async doCreateReview(review) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: review.userId },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const productDetail = await this.productDetailRepository.findOne({
                where: { id: review.productDetailId },
            });
            if (!productDetail) {
                throw new common_1.NotFoundException('Product detail not found');
            }
            const existingReview = await this.reviewRepository.findOne({
                where: {
                    userId: review.userId,
                    productDetailId: review.productDetailId,
                },
            });
            if (existingReview) {
                throw new common_1.BadRequestException('User has already reviewed this product');
            }
            const newReview = this.reviewRepository.create({
                ...review,
                isVerified: false,
            });
            const savedReview = await this.reviewRepository.save(newReview);
            return await this.reviewRepository.findOne({
                where: { id: savedReview.id },
                relations: ['user', 'productDetail'],
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to create review: ' + error.message);
        }
    }
    async doGetReviewById(data) {
        try {
            const review = await this.reviewRepository.findOne({
                where: { id: data.id },
                relations: ['user', 'productDetail'],
            });
            if (!review) {
                throw new common_1.NotFoundException('Review not found');
            }
            return review;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to get review: ' + error.message);
        }
    }
    async doGetReviewsByProduct(data) {
        try {
            const productDetail = await this.productDetailRepository.findOne({
                where: { id: data.productDetailId },
            });
            if (!productDetail) {
                throw new common_1.NotFoundException('Product detail not found');
            }
            const reviews = await this.reviewRepository.find({
                where: { productDetailId: data.productDetailId },
                relations: ['user', 'productDetail'],
                order: { createdAt: 'DESC' },
            });
            const totalReviews = reviews.length;
            const averageRating = totalReviews > 0
                ? reviews.reduce((acc, review) => acc + review.rating, 0) /
                    totalReviews
                : 0;
            return {
                reviews,
                statistics: {
                    totalReviews,
                    averageRating: Number(averageRating.toFixed(1)),
                    ratingDistribution: this.calculateRatingDistribution(reviews),
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to get product reviews: ' + error.message);
        }
    }
    async doGetReviewsByUser(data) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: data.userId },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const reviews = await this.reviewRepository.find({
                where: { userId: data.userId },
                relations: ['user', 'productDetail'],
                order: { createdAt: 'DESC' },
            });
            return {
                reviews,
                totalReviews: reviews.length,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to get user reviews: ' + error.message);
        }
    }
    async doUpdateReview(data) {
        try {
            const review = await this.reviewRepository.findOne({
                where: { id: data.id },
                relations: ['user', 'productDetail'],
            });
            if (!review) {
                throw new common_1.NotFoundException('Review not found');
            }
            const updateData = {
                rating: data.rating,
                comment: data.comment,
                isVerified: data.isVerified,
            };
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            Object.assign(review, updateData);
            return await this.reviewRepository.save(review);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to update review: ' + error.message);
        }
    }
    async doDeleteReview(data) {
        try {
            const review = await this.reviewRepository.findOne({
                where: { id: data.id },
            });
            if (!review) {
                throw new common_1.NotFoundException('Review not found');
            }
            await this.reviewRepository.remove(review);
            return {
                message: 'Review deleted successfully',
                deletedReviewId: data.id,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to delete review: ' + error.message);
        }
    }
    calculateRatingDistribution(reviews) {
        const distribution = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        };
        reviews.forEach((review) => {
            distribution[review.rating]++;
        });
        return distribution;
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_detail_entity_1.ProductDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewService);
//# sourceMappingURL=review.service.js.map