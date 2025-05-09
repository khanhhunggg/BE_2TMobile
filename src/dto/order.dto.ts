import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
  IsString,
  Min,
  IsDate,
  Length,
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
    description: 'Quantity of products',
    required: true,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    type: Number,
    description: 'Price of the item',
    required: true,
  })
  @IsNumber()
  @Min(0)
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
    description: 'Order status',
    required: false,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

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
    description: 'Note for the order',
    required: false,
  })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({
    type: String,
    description: 'User delivery location',
    required: false,
  })
  @IsString()
  @IsOptional()
  userLocation?: string;

  @ApiProperty({
    type: String,
    description: 'User phone number',
    required: false,
  })
  @IsString()
  @Length(10, 20)
  @IsOptional()
  userPhone?: string;

  @ApiProperty({
    type: String,
    description: 'User name',
    required: false,
  })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  userName?: string;

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

  @ApiProperty({
    type: String,
    description: 'Delivered date',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  delivered_date?: Date;
}

export class SearchOrderDto {
  @ApiProperty({
    type: Number,
    description: 'User ID',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @ApiProperty({
    type: String,
    description: 'Trạng thái đơn hàng',
    required: false,
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiProperty({
    type: String,
    description: 'Phương thức thanh toán',
    required: false,
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod)
  @IsOptional()
  payment_method?: PaymentMethod;

  @ApiProperty({
    type: String,
    description: 'Trường sắp xếp',
    required: false,
    default: 'order_date',
    enum: [
      'order_date',
      'total_price',
      'status',
      'expected_delivery_date',
      'delivered_date',
    ],
  })
  @IsString()
  @IsOptional()
  sort_by?: string;

  @ApiProperty({
    type: String,
    description: 'Thứ tự sắp xếp',
    required: false,
    default: 'DESC',
    enum: ['ASC', 'DESC'],
  })
  @IsString()
  @IsOptional()
  sort_order?: 'ASC' | 'DESC';

  @ApiProperty({
    type: Number,
    description: 'Số trang',
    required: false,
    default: 1,
  })
  @IsOptional()
  page?: number;

  @ApiProperty({
    type: Number,
    description: 'Số lượng đơn hàng trên mỗi trang',
    required: false,
    default: 10,
  })
  @IsOptional()
  size?: number;
}
