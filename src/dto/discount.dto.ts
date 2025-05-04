import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsDateString,
  Min,
} from 'class-validator';
import { DiscountType } from '../entity/discount.entity';

export class CreateDiscountDto {
  @ApiProperty({
    type: String,
    description: 'Tiêu đề khuyến mãi',
    required: true,
    example: 'Khuyến mãi tháng 12',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Mô tả khuyến mãi',
    required: false,
    example: 'Giảm giá 20% cho tất cả sản phẩm',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: String,
    description: 'Loại khuyến mãi',
    required: true,
    enum: DiscountType,
    example: DiscountType.PERCENTAGE,
  })
  @IsEnum(DiscountType)
  @IsNotEmpty()
  discount_type: DiscountType;

  @ApiProperty({
    type: Number,
    description: 'Giá trị khuyến mãi',
    required: true,
    example: 20,
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  discount_value: number;

  @ApiProperty({
    type: String,
    description: 'Ngày bắt đầu (YYYY-MM-DD HH:mm:ss)',
    required: true,
    example: '2024-01-01 00:00:00',
  })
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({
    type: String,
    description: 'Ngày kết thúc (YYYY-MM-DD HH:mm:ss)',
    required: true,
    example: '2024-01-31 23:59:59',
  })
  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @ApiProperty({
    type: Boolean,
    description: 'Trạng thái hoạt động',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class UpdateDiscountDto {
  @ApiProperty({
    type: Number,
    description: 'ID khuyến mãi',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Tiêu đề khuyến mãi',
    required: false,
    example: 'Khuyến mãi tháng 12',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    description: 'Mô tả khuyến mãi',
    required: false,
    example: 'Giảm giá 20% cho tất cả sản phẩm',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: String,
    description: 'Loại khuyến mãi',
    required: false,
    enum: DiscountType,
    example: DiscountType.PERCENTAGE,
  })
  @IsEnum(DiscountType)
  @IsOptional()
  discount_type?: DiscountType;

  @ApiProperty({
    type: Number,
    description: 'Giá trị khuyến mãi',
    required: false,
    example: 20,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  discount_value?: number;

  @ApiProperty({
    type: String,
    description: 'Ngày bắt đầu (YYYY-MM-DD HH:mm:ss)',
    required: false,
    example: '2024-01-01 00:00:00',
  })
  @IsDateString()
  @IsOptional()
  start_date?: string;

  @ApiProperty({
    type: String,
    description: 'Ngày kết thúc (YYYY-MM-DD HH:mm:ss)',
    required: false,
    example: '2024-01-31 23:59:59',
  })
  @IsDateString()
  @IsOptional()
  end_date?: string;

  @ApiProperty({
    type: Boolean,
    description: 'Trạng thái hoạt động',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class GetDiscountByIdDto {
  @ApiProperty({
    type: Number,
    description: 'ID khuyến mãi',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class SearchDiscountDto {
  @ApiProperty({
    type: String,
    description: 'Tiêu đề khuyến mãi',
    required: false,
    example: 'Khuyến mãi',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    description: 'Loại khuyến mãi',
    required: false,
    enum: DiscountType,
    example: DiscountType.PERCENTAGE,
  })
  @IsEnum(DiscountType)
  @IsOptional()
  discount_type?: DiscountType;

  @ApiProperty({
    type: Boolean,
    description: 'Trạng thái hoạt động',
    required: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({
    type: Number,
    description: 'Số trang',
    required: false,
    default: 1,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({
    type: Number,
    description: 'Số lượng trên mỗi trang',
    required: false,
    default: 10,
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  size?: number;
}

export class DeleteDiscountDto {
  @ApiProperty({
    type: Number,
    description: 'ID khuyến mãi cần xóa',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class AssignDiscountToUserDto {
  @ApiProperty({
    type: Number,
    description: 'ID khuyến mãi',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  discount_id: number;

  @ApiProperty({
    type: Number,
    description: 'ID người dùng',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
