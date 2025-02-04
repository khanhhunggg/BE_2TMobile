import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateIdDto {
  @ApiProperty({
    type: Array,
    description: 'Cart Food ID',
    required: true,
    example: [1],
    isArray: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsArray()
  CartFoodID: number[];
}
export class CreateOrderDto {
  @ApiProperty({
    type: Number,
    description: 'Payment Method ID',
    required: true,
  })
  @IsNotEmpty()
  PaymentMethodID: number;

  @ApiProperty({
    type: String,
    description: 'Delivery Address',
    required: true,
  })
  @IsNotEmpty()
  DeliveryAddress: string;

  @ApiProperty({ type: String, description: 'Note', required: false })
  @IsOptional()
  Note: string;
}

export class UpdateOrderDto extends CreateOrderDto {}
