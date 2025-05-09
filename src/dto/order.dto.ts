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
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod, OrderStatus } from '../entity/order.entity';

export class CreateOrderDetailDto {
  @ApiProperty({
    type: Number,
    description: 'Product ID',
    required: true,
  })
  @IsNumber()
  @IsOptional()
  product_id: number;

  @ApiProperty({
    type: Number,
    description: 'Color ID',
    required: true,
  })
  @IsNumber()
  @IsOptional()
  color_id: number;

  @ApiProperty({
    type: Number,
    description: 'Capacity ID',
    required: true,
  })
  @IsNumber()
  @IsOptional()
  capacity_id: number;

  @ApiProperty({
    type: Number,
    description: 'Product detail ID',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  product_detail_id?: number;

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

  @ApiProperty({
    type: String,
    description: 'Name of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  userName: string;

  @ApiProperty({
    type: String,
    description: 'Phone number of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  userPhone: string;

  @ApiProperty({
    type: String,
    description: 'Location of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  userLocation: string;

  @ApiProperty({
    type: String,
    description: 'Additional notes for the order',
    required: false,
  })
  @IsString()
  @IsOptional()
  note: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: Number, description: 'User ID', required: true })
  @IsNumber()
  @IsOptional()
  user_id: number;

  @ApiProperty({
    type: String,
    description: 'Payment method',
    required: true,
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod)
  @IsOptional()
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
    default: 'created_at',
    enum: ['created_at', 'updated_at', 'total_amount', 'status'],
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
