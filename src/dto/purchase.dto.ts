import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
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
  CREDIT_CARD = 'CREDIT_CARD',
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

export class UpdatePurchaseDto extends CreatePurchaseDto {}

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
