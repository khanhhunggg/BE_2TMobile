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
