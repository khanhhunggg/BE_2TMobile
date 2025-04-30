import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: String, description: 'Tên sản phẩm', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: 'Mô tả sản phẩm', required: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: Number, description: 'Giá sản phẩm', required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: Number, description: 'Năm sản xuất', required: true })
  @IsNumber()
  @IsOptional()
  release_year?: number;

  @ApiProperty({ type: Number, description: 'Năm sản xuất', required: true })
  @IsNumber()
  @IsOptional()
  warranty_period?: number;

  @ApiProperty({
    type: Boolean,
    description: 'Trạng thái sản phẩm',
    required: true,
  })
  @IsEnum(['Active', 'Inactive'])
  @IsOptional()
  status?: 'Active' | 'Inactive';

  @ApiProperty({ type: Number, description: 'ID nhà cung cấp', required: true })
  @IsNumber()
  @IsOptional()
  provider_id?: number;

  @ApiProperty({ type: Number, description: 'ID màu sắc', required: true })
  @IsNumber()
  @IsNotEmpty()
  color_id: number;

  @ApiProperty({ type: Number, description: 'ID dung lượng', required: true })
  @IsNumber()
  @IsNotEmpty()
  capacity_id: number;

  @ApiProperty({
    type: Boolean,
    description: 'Sản phẩm đặc biệt',
    required: true,
  })
  @IsBoolean()
  @IsOptional()
  is_featured?: boolean;
}

export class UpdateProductDto {
  @ApiProperty({ type: String, description: 'Tên sản phẩm', required: true })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, description: 'Mô tả sản phẩm', required: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: Number, description: 'Năm sản xuất', required: true })
  @IsNumber()
  @IsOptional()
  release_year?: number;

  @ApiProperty({ type: Number, description: 'Năm sản xuất', required: true })
  @IsNumber()
  @IsOptional()
  warranty_period?: number;

  @ApiProperty({
    type: Boolean,
    description: 'Trạng thái sản phẩm',
    required: true,
  })
  @IsEnum(['Active', 'Inactive'])
  @IsOptional()
  status?: 'Active' | 'Inactive';

  @ApiProperty({ type: Number, description: 'ID nhà cung cấp', required: true })
  @IsNumber()
  @IsOptional()
  provider_id?: number;
}
