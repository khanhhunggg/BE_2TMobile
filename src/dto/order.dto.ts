import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod, OrderStatus } from '../entity/order.entity';

export class CreateOrderDetailDto {
  @ApiProperty({
    type: Number,
    description: 'Product detail ID',
    required: true,
  })
  @IsNumber()
  product_detail_id: number;

  @ApiProperty({
    type: Number,
    description: 'Cart detail ID',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  cart_detail_id?: number;

  @ApiProperty({
    type: Number,
    description: 'Quantity of products',
    required: true,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: Number,
    description: 'Price of the item',
    required: true,
  })
  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: Number, description: 'User ID', required: true })
  @IsNumber()
  user_id: number;

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

  @ApiProperty({
    type: [CreateOrderDetailDto],
    description: 'Order details',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  order_details: CreateOrderDetailDto[];
}

export class UpdateOrderDto extends CreateOrderDto {
  @ApiProperty({ type: Number, description: 'Order ID', required: true })
  @IsNumber()
  id: number;
}
