import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class VendorBillItemDto {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  productId: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  quantity: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  totalPrice: number;
}

export class CreateVendorBillDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  lotCode?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  itemType?: string;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  vendorId: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsDateString()
  orderDate?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  orderTime?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ type: [VendorBillItemDto], required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VendorBillItemDto)
  items: VendorBillItemDto[];
}

export class GetVendorBillByIdDto {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  id: number;
}

export class SearchVendorBillDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  lotCode?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  itemType?: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  vendorId?: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  size?: number;
}

export class UpdateVendorBillDto extends CreateVendorBillDto {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  id: number;
}

export class DeleteVendorBillDto {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  id: number;
}
