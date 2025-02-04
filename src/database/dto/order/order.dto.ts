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

export class CreateOrderDetailDto {
  @ApiProperty({ type: Number, description: 'Order ID', required: true })
  @IsNotEmpty()
  OrderID: number;

  // @ApiProperty({ type: Number, description: 'Food ID', required: true })
  // @IsNotEmpty()
  // FoodID: number;

  // @ApiProperty({ type: Number, description: 'Quantity', required: true })
  // @IsNotEmpty()
  // Quantity: number;

  // @ApiProperty({ type: Number, description: 'Unit Price', required: true })
  // @IsNotEmpty()
  // UnitPrice: number;
}

export class UpdateOrderDto extends CreateOrderDto {}

export class AdminGetAllOrderByUserIdDto {
  @ApiProperty({ type: Number, description: 'User ID', required: true })
  @IsNotEmpty()
  UserID: number;
}
