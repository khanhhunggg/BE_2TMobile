import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { PaymentMethod, OrderStatus } from '../entity/order.entity';

export class CreateOrderDto {
  @ApiProperty({ type: Number, description: 'Product ID', required: true })
  @IsNumber()
  product_id: number;

  @ApiProperty({ type: Number, description: 'User ID', required: true })
  @IsNumber()
  user_id: number;

  @ApiProperty({ type: Number, description: 'Cart ID', required: false })
  @IsNumber()
  @IsOptional()
  cart_id?: number;

  @ApiProperty({
    type: Number,
    description: 'Quantity of products',
    required: true,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: Number,
    description: 'Total price of the order',
    required: true,
  })
  @IsNumber()
  total_price: number;

  @ApiProperty({
    type: String,
    description: 'Payment method',
    required: true,
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @ApiProperty({
    type: String,
    description: 'Expected delivery date',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  expected_delivery_date?: Date;

  @ApiProperty({
    type: String,
    description: 'Order status',
    required: false,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
