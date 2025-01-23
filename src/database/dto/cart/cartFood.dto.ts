import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddToCartFoodDto {
  @IsNotEmpty()
  @IsNumber()
  CartID: number;

  @IsNotEmpty()
  @IsNumber()
  FoodID: number;

  @IsNotEmpty()
  @IsNumber()
  Quantity: number;
}
export class UpdateCartFoodDto extends AddToCartFoodDto {}
