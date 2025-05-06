import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PaymentLinkResponseDto {
  @ApiProperty({ description: 'URL thanh toán' })
  checkoutUrl: string;
}

export class CreatePaymentLinkDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  buyerName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  buyerEmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  buyerPhone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  buyerAddress: string;

  @ApiProperty({
    description: 'Unix timestamp for payment expiration (optional)',
    example: 1735689600,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  expiredAt?: number;
}

export class GetPaymentByIdDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class SearchPaymentDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  orderId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  buyerName?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  buyerEmail?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  buyerPhone?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  size?: number;

  @ApiProperty({
    description: 'Trường sắp xếp',
    required: false,
    default: 'created_at',
  })
  @ApiProperty({
    description: 'Thứ tự sắp xếp',
    required: false,
    default: 'DESC',
  })
  sort_by?: string;

  @ApiProperty({
    description: 'Thứ tự sắp xếp',
    required: false,
    default: 'DESC',
  })
  order?: 'ASC' | 'DESC';
}

export class UpdatePaymentDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  buyerName?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  buyerEmail?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  buyerPhone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  buyerAddress?: string;
}

export class DeletePaymentDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
