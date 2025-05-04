import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsNumberString,
  ValidateNested,
  IsArray,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSpecsDto } from './specs.dto';

export class ProductImageDto {
  @ApiProperty({ type: String, description: 'URL hình ảnh', required: true })
  @IsString()
  @IsNotEmpty()
  image_url: string;
}

export class CreateProductDto {
  @ApiProperty({ type: String, description: 'Tên sản phẩm', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

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
  @IsNotEmpty()
  vendor_id: number;

  @ApiProperty({
    type: [Number],
    description: 'Danh sách ID màu sắc',
    required: false,
    isArray: true,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  color_ids?: number[];

  @ApiProperty({ type: Number, description: 'ID dung lượng', required: false })
  @IsNumber()
  @IsOptional()
  capacity_id?: number;

  @ApiProperty({
    type: Boolean,
    description: 'Sản phẩm đặc biệt',
    required: true,
  })
  @IsBoolean()
  @IsOptional()
  is_featured?: boolean;

  @ApiProperty({ type: String, description: 'Model sản phẩm', required: false })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty({
    type: CreateSpecsDto,
    description: 'Thông số kỹ thuật',
    required: false,
  })
  @ValidateNested()
  @Type(() => CreateSpecsDto)
  @IsOptional()
  specs?: CreateSpecsDto;

  @ApiProperty({
    type: [ProductImageDto],
    description: 'Danh sách hình ảnh sản phẩm',
    required: false,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  @IsOptional()
  image_urls?: ProductImageDto[];
}

export class UpdateProductDto {
  @ApiProperty({ type: Number, description: 'ID sản phẩm', required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ type: String, description: 'Tên sản phẩm', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, description: 'Model sản phẩm', required: false })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty({ type: String, description: 'Mô tả sản phẩm', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: Number,
    description: 'Thời gian bảo hành',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  warranty_period?: number;

  @ApiProperty({ type: Number, description: 'Năm sản xuất', required: false })
  @IsNumber()
  @IsOptional()
  release_year?: number;

  @ApiProperty({
    type: Boolean,
    description: 'Sản phẩm đặc biệt',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_featured?: boolean;

  @ApiProperty({
    type: String,
    description: 'Trạng thái',
    required: false,
    enum: ['Active', 'Inactive'],
  })
  @IsEnum(['Active', 'Inactive'])
  @IsOptional()
  status?: 'Active' | 'Inactive';

  @ApiProperty({
    type: Number,
    description: 'ID nhà cung cấp',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  vendor_id?: number;

  @ApiProperty({
    type: Number,
    description: 'ID màu sắc',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  color_id?: number;

  @ApiProperty({
    type: [Number],
    description: 'Danh sách ID màu sắc',
    required: false,
    isArray: true,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  color_ids?: number[];

  @ApiProperty({ type: Number, description: 'ID dung lượng', required: false })
  @IsNumber()
  @IsOptional()
  capacity_id?: number;

  @ApiProperty({
    type: Number,
    description: 'Số lượng tồn kho',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  stock_quantity?: number;

  @ApiProperty({ type: String, description: 'Số seri', required: false })
  @IsString()
  @IsOptional()
  serial_number?: string;

  @ApiProperty({
    type: String,
    description: 'Giá nhập',
    required: false,
    example: '1000000',
  })
  @IsString()
  @IsOptional()
  import_price?: string;

  @ApiProperty({
    type: String,
    description: 'Giá bán',
    required: false,
    example: '1100000',
  })
  @IsString()
  @IsOptional()
  selling_price?: string;

  @ApiProperty({
    type: CreateSpecsDto,
    description: 'Thông số kỹ thuật',
    required: false,
  })
  @ValidateNested()
  @Type(() => CreateSpecsDto)
  @IsOptional()
  specs?: CreateSpecsDto;

  @ApiProperty({
    type: [ProductImageDto],
    description: 'Danh sách hình ảnh sản phẩm',
    required: false,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  @IsOptional()
  image_urls?: ProductImageDto[];
}

export class GetProductByIdDto {
  @ApiProperty({ type: Number, description: 'ID sản phẩm', required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class SearchProductDto {
  @ApiProperty({ type: String, description: 'Tên sản phẩm', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, description: 'Model sản phẩm', required: false })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty({
    type: Number,
    description: 'ID nhà cung cấp',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  vendor_id?: number;

  @ApiProperty({
    type: Number,
    description: 'ID màu sắc',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  color_id?: number;

  @ApiProperty({
    type: [Number],
    description: 'Danh sách ID màu sắc',
    required: false,
    isArray: true,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  color_ids?: number[];

  @ApiProperty({ type: Number, description: 'ID dung lượng', required: false })
  @IsNumber()
  @IsOptional()
  capacity_id?: number;

  @ApiProperty({
    type: String,
    description: 'Trạng thái sản phẩm',
    required: false,
    enum: ['Active', 'Inactive'],
  })
  @IsEnum(['Active', 'Inactive'])
  @IsOptional()
  status?: 'Active' | 'Inactive';

  @ApiProperty({
    type: Boolean,
    description: 'Sản phẩm đặc biệt',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_featured?: boolean;

  @ApiProperty({
    type: Number,
    description: 'Số trang',
    required: false,
    default: 1,
  })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiProperty({
    type: Number,
    description: 'Số lượng sản phẩm trên mỗi trang',
    required: false,
    default: 10,
  })
  @IsNumberString()
  @IsOptional()
  size?: number;
}

export class DeleteProductDto {
  @ApiProperty({
    type: Number,
    description: 'ID sản phẩm cần xóa',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
