import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateReviewDto,
  DeleteReviewDto,
  GetReviewByIdDto,
  GetReviewsByProductDto,
  GetReviewsByUserDto,
  UpdateReviewDto,
} from '../dto/review.dto';
import { ReviewService } from './review.service';

@ApiTags('Đánh giá')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create-review')
  @ApiOperation({ summary: 'Tạo đánh giá mới' })
  public async CreateReview(@Body() review: CreateReviewDto) {
    return await this.reviewService.doCreateReview(review);
  }

  @Get('get-review-by-id')
  @ApiOperation({ summary: 'Lấy đánh giá theo ID' })
  public async GetReviewById(@Query() data: GetReviewByIdDto) {
    return await this.reviewService.doGetReviewById(data);
  }

  @Get('get-reviews-by-product')
  @ApiOperation({ summary: 'Lấy danh sách đánh giá theo sản phẩm' })
  public async GetReviewsByProduct(@Query() data: GetReviewsByProductDto) {
    return await this.reviewService.doGetReviewsByProduct(data);
  }

  @Get('get-reviews-by-user')
  @ApiOperation({ summary: 'Lấy danh sách đánh giá theo người dùng' })
  public async GetReviewsByUser(@Query() data: GetReviewsByUserDto) {
    return await this.reviewService.doGetReviewsByUser(data);
  }

  @Put('update-review')
  @ApiOperation({ summary: 'Cập nhật đánh giá' })
  public async UpdateReview(@Body() data: UpdateReviewDto) {
    return await this.reviewService.doUpdateReview(data);
  }

  @Delete('delete-review')
  @ApiOperation({ summary: 'Xóa đánh giá' })
  public async DeleteReview(@Query() data: DeleteReviewDto) {
    return await this.reviewService.doDeleteReview(data);
  }
}
