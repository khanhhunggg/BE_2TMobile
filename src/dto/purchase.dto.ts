import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsDate,
  Min,
  Max,
  MaxLength,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationResponseDto } from 'src/common/common.dto';

export enum PurchaseStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export class PurchaseItemDto {
  @ApiProperty({ type: Number, description: 'Product ID', required: true })
  @IsNumber()
  ProductId: number;

  @ApiProperty({ type: Number, description: 'Quantity', required: true })
  @IsNumber()
  Quantity: number;

  @ApiProperty({ type: Number, description: 'Unit Price', required: true })
  @IsNumber()
  UnitPrice: number;
}

export class CreatePurchaseDto {
  @ApiProperty({ type: String, description: 'Lot Code', required: false })
  @IsOptional()
  @IsString()
  LotCode?: string;

  @ApiProperty({ type: String, description: 'Item Type', required: false })
  @IsOptional()
  @IsString()
  ItemType?: string;

  @ApiProperty({ type: Number, description: 'Vendor ID', required: true })
  @IsNumber()
  VendorId: number;

  @ApiProperty({
    type: String,
    description: 'Payment Method',
    required: false,
    enum: PaymentMethod,
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  PaymentMethod?: PaymentMethod;

  @ApiProperty({ type: String, description: 'Order Date', required: false })
  @IsOptional()
  @IsDateString()
  OrderDate?: string;

  @ApiProperty({ type: String, description: 'Order Time', required: false })
  @IsOptional()
  @IsString()
  OrderTime?: string;

  @ApiProperty({
    type: String,
    description: 'Status',
    required: false,
    enum: PurchaseStatus,
  })
  @IsOptional()
  @IsEnum(PurchaseStatus)
  Status?: PurchaseStatus;

  @ApiProperty({ type: String, description: 'Note', required: false })
  @IsOptional()
  @IsString()
  Note?: string;

  @ApiProperty({
    type: [PurchaseItemDto],
    description: 'Purchase Items',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  Items: PurchaseItemDto[];
}

export class UpdatePurchaseDto {
  @ApiProperty({
    type: Number,
    description: 'Purchase ID',
    required: true,
  })
  @IsNumber()
  @Min(1)
  Id: number;

  @ApiProperty({
    type: String,
    description: 'Lot Code',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  LotCode?: string;

  @ApiProperty({
    type: String,
    description: 'Item Type',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  ItemType?: string;

  @ApiProperty({
    type: Number,
    description: 'Vendor ID',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  VendorId?: number;

  @ApiProperty({
    type: String,
    description: 'Payment Method',
    required: false,
    enum: PaymentMethod,
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  PaymentMethod?: PaymentMethod;

  @ApiProperty({
    type: String,
    description: 'Order Date (YYYY-MM-DD)',
    required: false,
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  OrderDate?: string;

  @ApiProperty({
    type: String,
    description: 'Order Time',
    required: false,
  })
  @IsOptional()
  @IsString()
  OrderTime?: string;

  @ApiProperty({
    type: String,
    description: 'Status',
    required: false,
    enum: PurchaseStatus,
  })
  @IsOptional()
  @IsEnum(PurchaseStatus)
  Status?: PurchaseStatus;

  @ApiProperty({
    type: String,
    description: 'Note',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  Note?: string;

  @ApiProperty({
    type: [PurchaseItemDto],
    description: 'Purchase Items',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  Items?: PurchaseItemDto[];
}

export class GetPurchaseByIdDto {
  @ApiProperty({ type: Number, description: 'Purchase ID', required: true })
  @IsNumber()
  Id: number;
}

export class GetPurchaseByVendorDto extends PaginationResponseDto {
  @ApiProperty({ type: Number, description: 'Vendor ID', required: true })
  @IsNumber()
  VendorId: number;
}

export class GetPurchaseByDateRangeDto extends PaginationResponseDto {
  @ApiProperty({ type: String, description: 'Start Date', required: true })
  @IsDateString()
  StartDate: string;

  @ApiProperty({ type: String, description: 'End Date', required: true })
  @IsDateString()
  EndDate: string;
}

export class DeletePurchaseDto {
  @ApiProperty({ type: Number, description: 'Purchase ID', required: true })
  @IsNumber()
  Id: number;
}

export class GetPurchaseListDto {
  @ApiProperty({
    type: Number,
    description: 'Page number for pagination',
    required: false,
  })
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    type: Number,
    description: 'Number of items per page',
    required: false,
  })
  @IsOptional()
  size?: number = 10;

  @ApiProperty({
    type: String,
    description: 'Search term for lot code, vendor name or vendor code',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string = '';

  @ApiProperty({
    type: String,
    description: 'Filter by purchase status',
    required: false,
    enum: PurchaseStatus,
  })
  @IsOptional()
  @IsEnum(PurchaseStatus)
  status?: PurchaseStatus;

  @ApiProperty({
    type: Number,
    description: 'Filter by vendor ID',
    required: false,
  })
  @IsOptional()
  vendorId?: number;

  @ApiProperty({
    type: Date,
    description: 'Start date for date range filter (YYYY-MM-DD)',
    required: false,
    format: 'date',
  })
  @IsOptional()
  @IsDate()
  @IsDateString()
  startDate?: Date;

  @ApiProperty({
    type: Date,
    description: 'End date for date range filter (YYYY-MM-DD)',
    required: false,
    format: 'date',
  })
  @IsOptional()
  @IsDate()
  @IsDateString()
  endDate?: Date;

  @ApiProperty({
    type: String,
    description: 'Sắp xếp theo',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'orderDate';

  @ApiProperty({
    type: String,
    description: 'Hướng sắp xếp',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortDirection?: string = 'DESC';
}
