import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  IsDate,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { ReturnType } from '../entity/return.entity';
import { ReturnStatus } from '../entity/return-detail.entity';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateReturnDto {
  @ApiProperty({ description: 'Order detail ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  orderDetailId: number;

  @ApiProperty({ description: 'Purchase detail ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  purchaseDetailId: number;

  @ApiProperty({ description: 'Admin ID', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  adminId?: number;

  @ApiProperty({ description: 'Customer ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @ApiProperty({
    description: 'Return code',
    example: 'RET001',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  returnCode?: string;

  @ApiProperty({
    description: 'Return type',
    enum: ReturnType,
    example: ReturnType.REFUND,
  })
  @IsNotEmpty()
  @IsEnum(ReturnType)
  type: ReturnType;

  @ApiProperty({
    description: 'Refund amount',
    example: 100000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  refundAmount?: number;

  @ApiProperty({ description: 'Reason ID', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  reasonId?: number;

  @ApiProperty({
    description: 'Expected return date',
    example: '2024-03-20',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expectedReturnDate?: Date;

  @ApiProperty({
    description: 'Notes',
    example: 'Customer requested return due to wrong size',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}

export class UpdateReturnDto extends PartialType(CreateReturnDto) {}

export class CreateReturnDetailDto {
  @ApiProperty({
    description: 'Return status',
    enum: ReturnStatus,
    example: ReturnStatus.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(ReturnStatus)
  status?: ReturnStatus;

  @ApiProperty({
    description: 'Shipping code',
    example: 'SHIP123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  shippingCode?: string;

  @ApiProperty({
    description: 'Custom reason',
    example: 'Product damaged during shipping',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  customReason?: string;

  @ApiProperty({
    description: 'Images of returned items',
    type: [String],
    example: ['image1.jpg', 'image2.jpg'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  images?: string[];

  @ApiProperty({ description: 'Quantity returned', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Product condition',
    example: 'Damaged',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  productCondition?: string;
}

export class ReturnResponseDto extends CreateReturnDto {
  @ApiProperty({ description: 'Return ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;

  @ApiProperty({ type: [CreateReturnDetailDto] })
  returnDetails: CreateReturnDetailDto[];
}
