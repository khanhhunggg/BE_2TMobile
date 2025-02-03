import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { IsNumber } from 'class-validator';

export class CartDto {
  @IsNotEmpty()
  @IsNumber()
  UserID: number;

  @IsNotEmpty()
  @IsNumber()
  TotalQuantity: number;
}
export class AddToCartDto {
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
export class GetCartByDateDto {
  @ApiProperty({
    description: 'Date',
    example: '2025-01-01',
  })
  @IsDateString()
  Date: Date;
}
export class DeleteCartDto {
  @ApiProperty({
    description: 'Cart ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  CartID: number;
}
