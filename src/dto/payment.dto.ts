import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentLinkResponseDto {
  @ApiProperty({ description: 'URL thanh toán' })
  checkoutUrl: string;
}

export class CreatePaymentLinkDto {
  @ApiProperty({ description: 'ID của đơn hàng' })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: 'Tên người mua' })
  @IsString()
  buyerName: string;

  @ApiProperty({ description: 'Email người mua' })
  @IsEmail()
  buyerEmail: string;

  @ApiProperty({ description: 'Số điện thoại người mua' })
  @IsString()
  buyerPhone: string;

  @ApiProperty({ description: 'Địa chỉ người mua' })
  @IsString()
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
  @ApiProperty({ description: 'ID của thanh toán' })
  id: number;
}

export class SearchPaymentDto {
  @ApiProperty({ description: 'ID của đơn hàng', required: false })
  orderId?: number;

  @ApiProperty({ description: 'Tên người mua', required: false })
  buyerName?: string;

  @ApiProperty({ description: 'Email người mua', required: false })
  buyerEmail?: string;

  @ApiProperty({ description: 'Số điện thoại người mua', required: false })
  buyerPhone?: string;

  @ApiProperty({ description: 'Số trang', required: false, default: 1 })
  page?: number;

  @ApiProperty({
    description: 'Số lượng phần tử trên trang',
    required: false,
    default: 10,
  })
  size?: number;

  @ApiProperty({
    description: 'Trường sắp xếp',
    required: false,
    default: 'created_at',
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
  @ApiProperty({ description: 'ID của thanh toán' })
  id: number;

  @ApiProperty({ description: 'ID của đơn hàng', required: false })
  orderId?: number;

  @ApiProperty({ description: 'Tên người mua', required: false })
  buyerName?: string;

  @ApiProperty({ description: 'Email người mua', required: false })
  buyerEmail?: string;

  @ApiProperty({ description: 'Số điện thoại người mua', required: false })
  buyerPhone?: string;

  @ApiProperty({ description: 'Địa chỉ người mua', required: false })
  buyerAddress?: string;
}

export class DeletePaymentDto {
  @ApiProperty({ description: 'ID của thanh toán' })
  id: number;
}
