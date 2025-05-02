import { IsNotEmpty } from 'class-validator';
import { IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  product_detail_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
