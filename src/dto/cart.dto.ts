import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({ description: 'ID of the user', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
export class CreateCartItemDto {
  @ApiProperty({ description: 'ID of the user', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}

export class CartItemDto {
  @ApiProperty({ description: 'ID of the user', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'ID of the product detail', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  product_detail_id: number;

  @ApiProperty({ description: 'Quantity of the product', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({
    description: 'Price of the product',
    example: '100000',
  })
  @IsOptional()
  @IsString()
  price?: string;
}

export class GetCartByUserDto {
  @ApiProperty({ description: 'ID of the user', example: 1, required: true })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}

export class UpdateCartItemDto {
  @ApiProperty({ description: 'ID of the cart', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  cart_id: number;

  @ApiProperty({ description: 'ID of the cart item', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  item_id: number;

  @ApiPropertyOptional({
    description: 'New quantity of the product',
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({
    description: 'New price of the product',
    example: '120000',
  })
  @IsOptional()
  @IsString()
  price?: string;
}

export class DeleteCartItemDto {
  @ApiProperty({ description: 'ID of the cart', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  cart_id: number;

  @ApiProperty({ description: 'ID of the cart item', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  item_id: number;
}

export class UpdateCartDetailDto {
  @ApiPropertyOptional({
    description: 'New quantity of the product',
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({
    description: 'New price of the product',
    example: '120000',
  })
  @IsOptional()
  @IsString()
  price?: string;
}

export class CartItemResponseDto {
  @ApiProperty({ description: 'ID of the cart item', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID of the cart', example: 1 })
  cart_id: number;

  @ApiProperty({ description: 'ID of the product detail', example: 1 })
  product_detail_id: number;

  @ApiProperty({ description: 'Quantity of the product', example: 2 })
  quantity: number;

  @ApiProperty({ description: 'Price of the product', example: '100000' })
  price: string;

  @ApiProperty({ description: 'Creation timestamp' })
  created_at: Date;

  @ApiPropertyOptional({
    description: 'Product details',
    example: {
      id: 1,
      name: 'Product Name',
      model: 'Model XYZ',
      description: 'Product description',
      warranty_period: 12,
      release_year: 2023,
      is_featured: true,
      status: 'active',
      provider_id: 1,
    },
  })
  product?: {
    id: number;
    name: string;
    model: string;
    description: string;
    warranty_period: number;
    release_year: number;
    is_featured: boolean;
    status: string;
    provider_id: number;
  };
}

export class CartResponseDto {
  @ApiProperty({ description: 'ID of the cart', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID of the user', example: 1 })
  user_id: number;

  @ApiProperty({ description: 'Creation timestamp' })
  created_at: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updated_at: Date;

  @ApiPropertyOptional({
    type: [CartItemResponseDto],
    description: 'Items in the cart',
  })
  items?: CartItemResponseDto[];
}
