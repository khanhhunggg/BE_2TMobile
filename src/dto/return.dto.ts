import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ReturnType } from '../entity/return.entity';
import { ReturnStatus } from '../entity/return-detail.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateReturnDto {
  @IsNotEmpty()
  @IsNumber()
  orderDetailId: number;

  @IsNotEmpty()
  @IsNumber()
  purchaseDetailId: number;

  @IsOptional()
  @IsNumber()
  adminId?: number;

  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  returnCode?: string;

  @IsNotEmpty()
  @IsEnum(ReturnType)
  type: ReturnType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  refundAmount?: number;

  @IsOptional()
  @IsNumber()
  reasonId?: number;
}

export class UpdateReturnDto extends PartialType(CreateReturnDto) {}

export class CreateReturnDetailDto {
  @IsOptional()
  @IsEnum(ReturnStatus)
  status?: ReturnStatus;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  shippingCode?: string;

  @IsOptional()
  @IsString()
  customReason?: string;

  @IsOptional()
  images?: string[];
}
