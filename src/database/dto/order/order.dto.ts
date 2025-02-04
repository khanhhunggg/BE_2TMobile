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
    type: Number,
    description: 'Shipping Method ID',
    required: true,
  })
  @IsNotEmpty()
  ShippingMethodID: number;

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

export class UpdateOrderStatusDto {
  @ApiProperty({ type: Number, description: 'Order ID', required: true })
  @IsNotEmpty()
  OrderID: number;

  @ApiProperty({ type: Number, description: 'Order Status ID', required: true })
  @IsNotEmpty()
  OrderStatusID: number;
}

export class GetAllOrderByStatusIdDto {
  @ApiProperty({ type: Number, description: 'Order Status ID', required: true })
  @IsNotEmpty()
  OrderStatusID: number;
}

export class AdminGetAllOrderByUserIdDto {
  @ApiProperty({ type: Number, description: 'User ID', required: true })
  @IsNotEmpty()
  UserID: number;
}

export class CreateOrderDetailDto {
  @ApiProperty({ type: Number, description: 'Order ID', required: true })
  @IsNotEmpty()
  OrderID: number;

  @ApiProperty({ type: Number, description: 'Cart Food ID', required: true })
  @IsNotEmpty()
  CartFoodID: number;
}
export class UpdateOrderDetailDto extends CreateOrderDetailDto {}
