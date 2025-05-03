import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentLinkResponseDto {
  @ApiProperty({ description: 'The URL to redirect to for payment' })
  checkoutUrl: string;
}

export class CreatePaymentLinkDto {
  @ApiProperty({ description: 'ID of the orderId', example: 123 })
  @IsNumber()
  orderId: number;

  @ApiProperty({
    description: 'Name of the buyer (optional)',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  buyerName?: string;

  @ApiProperty({
    description: 'Email of the buyer (optional)',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  buyerEmail?: string;

  @ApiProperty({
    description: 'Phone number of the buyer (optional)',
    example: '0123456789',
    required: false,
  })
  @IsString()
  @IsOptional()
  buyerPhone?: string;

  @ApiProperty({
    description: 'Address of the buyer (optional)',
    example: '123 Main Street, Hanoi',
    required: false,
  })
  @IsString()
  @IsOptional()
  buyerAddress?: string;

  @ApiProperty({
    description: 'Unix timestamp for payment expiration (optional)',
    example: 1735689600,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  expiredAt?: number;
}
