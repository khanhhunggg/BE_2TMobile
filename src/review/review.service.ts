import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entity/review.entity';
import { User } from '../entity/user.entity';
import { ProductDetail } from '../entity/product-detail.entity';
import {
  CreateReviewDto,
  DeleteReviewDto,
  GetReviewByIdDto,
  GetReviewsByProductDto,
  GetReviewsByUserDto,
  UpdateReviewDto,
} from '../dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,
  ) {}

  async doCreateReview(review: CreateReviewDto) {
    try {
      // Kiểm tra user tồn tại
      const user = await this.userRepository.findOne({
        where: { id: review.userId },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Kiểm tra sản phẩm tồn tại
      const productDetail = await this.productDetailRepository.findOne({
        where: { id: review.productDetailId },
      });
      if (!productDetail) {
        throw new NotFoundException('Product detail not found');
      }

      // Kiểm tra xem user đã đánh giá sản phẩm này chưa
      const existingReview = await this.reviewRepository.findOne({
        where: {
          userId: review.userId,
          productDetailId: review.productDetailId,
        },
      });
      if (existingReview) {
        throw new BadRequestException('User has already reviewed this product');
      }

      const newReview = this.reviewRepository.create({
        ...review,
        isVerified: false, // Mặc định là chưa xác minh
      });

      const savedReview = await this.reviewRepository.save(newReview);

      // Lấy thông tin đầy đủ của review vừa tạo
      return await this.reviewRepository.findOne({
        where: { id: savedReview.id },
        relations: ['user', 'productDetail'],
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to create review: ' + error.message,
      );
    }
  }

  async doGetReviewById(data: GetReviewByIdDto) {
    try {
      const review = await this.reviewRepository.findOne({
        where: { id: data.id },
        relations: ['user', 'productDetail'],
      });

      if (!review) {
        throw new NotFoundException('Review not found');
      }

      return review;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to get review: ' + error.message);
    }
  }

  async doGetReviewsByProduct(data: GetReviewsByProductDto) {
    try {
      // Kiểm tra sản phẩm tồn tại
      const productDetail = await this.productDetailRepository.findOne({
        where: { id: data.productDetailId },
      });
      if (!productDetail) {
        throw new NotFoundException('Product detail not found');
      }

      const reviews = await this.reviewRepository.find({
        where: { productDetailId: data.productDetailId },
        relations: ['user', 'productDetail'],
        order: { createdAt: 'DESC' },
      });

      // Tính toán thống kê đánh giá
      const totalReviews = reviews.length;
      const averageRating =
        totalReviews > 0
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to get product reviews: ' + error.message,
      );
    }
  }

  async doGetReviewsByUser(data: GetReviewsByUserDto) {
    try {
      // Kiểm tra user tồn tại
      const user = await this.userRepository.findOne({
        where: { id: data.userId },
      });
      if (!user) {
        throw new NotFoundException('User not found');
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to get user reviews: ' + error.message,
      );
    }
  }

  async doUpdateReview(data: UpdateReviewDto) {
    try {
      const review = await this.reviewRepository.findOne({
        where: { id: data.id },
        relations: ['user', 'productDetail'],
      });

      if (!review) {
        throw new NotFoundException('Review not found');
      }

      const updateData: Partial<Review> = {};

      // Only update fields that have changed
      if (data.rating !== undefined && data.rating !== review.rating) {
        updateData.rating = data.rating;
      }
      if (data.comment !== undefined && data.comment !== review.comment) {
        updateData.comment = data.comment;
      }
      if (
        data.isVerified !== undefined &&
        data.isVerified !== review.isVerified
      ) {
        updateData.isVerified = data.isVerified;
      }

      // Only perform update if there are actual changes
      if (Object.keys(updateData).length > 0) {
        await this.reviewRepository.update(data.id, updateData);
      }

      return await this.reviewRepository.findOne({
        where: { id: data.id },
        relations: ['user', 'productDetail'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to update review: ' + error.message,
      );
    }
  }

  async doDeleteReview(data: DeleteReviewDto) {
    try {
      const review = await this.reviewRepository.findOne({
        where: { id: data.id },
      });

      if (!review) {
        throw new NotFoundException('Review not found');
      }

      await this.reviewRepository.remove(review);
      return {
        message: 'Review deleted successfully',
        deletedReviewId: data.id,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to delete review: ' + error.message,
      );
    }
  }

  private calculateRatingDistribution(reviews: Review[]) {
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
}
