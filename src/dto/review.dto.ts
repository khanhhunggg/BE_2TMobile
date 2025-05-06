import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'ID của người dùng' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'ID của chi tiết sản phẩm' })
  @IsInt()
  @IsNotEmpty()
  productDetailId: number;

  @ApiProperty({ description: 'Đánh giá (1-5)', minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ description: 'Bình luận', required: false })
  @IsString()
  @IsOptional()
  comment?: string;
}

export class UpdateReviewDto {
  @ApiProperty({ description: 'ID của đánh giá' })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Đánh giá (1-5)',
    minimum: 1,
    maximum: 5,
    required: false,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({ description: 'Bình luận', required: false })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ description: 'Trạng thái xác minh', required: false })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
}

export class GetReviewByIdDto {
  @ApiProperty({ description: 'ID của đánh giá' })
  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class GetReviewsByProductDto {
  @ApiProperty({ description: 'ID của chi tiết sản phẩm' })
  @IsInt()
  @IsNotEmpty()
  productDetailId: number;
}

export class GetReviewsByUserDto {
  @ApiProperty({ description: 'ID của người dùng' })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}

export class DeleteReviewDto {
  @ApiProperty({ description: 'ID của đánh giá' })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
