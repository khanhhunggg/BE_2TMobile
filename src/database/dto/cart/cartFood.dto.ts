import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddToCartFoodDto {
  @ApiProperty({
    description: 'Cart ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  CartID: number;

  @ApiProperty({
    description: 'Food ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  FoodID: number;

  @ApiProperty({
    description: 'Quantity',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  Quantity: number;
}

export class UpdateCartFoodDto {
  @ApiProperty({
    description: 'Cart Food ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  CartFoodID: number;

  @ApiProperty({
    description: 'Quantity',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  Quantity: number;
}

export class DeleteCartFoodDto {
  @ApiProperty({
    description: 'Cart Food ID',
    example: 1,
  })
  CartFoodID: number;
}

export class GetCartFoodDto {
  @ApiProperty({
    description: 'Cart Food ID',
    example: 1,
    required: false,
  })
  CartFoodID?: number;

  @ApiProperty({
    description: 'Cart ID',
    example: 1,
    required: false,
  })
  CartID?: number;
}

export class CalculateTotalPriceDto {
  @ApiProperty({
    description: 'Food ID',
    example: 1,
  })
  FoodID: number;
}
