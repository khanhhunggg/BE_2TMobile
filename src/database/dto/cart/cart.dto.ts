import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsNumber } from 'class-validator';

export class CartDto {
  @IsNotEmpty()
  @IsNumber()
  UserID: number;

  @IsNotEmpty()
  @IsNumber()
  TotalQuantity: number;
}
export class UpdateCartDto extends CartDto {}

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
