import { IsNotEmpty, IsOptional, IsInt, Min, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodDto {
  @ApiProperty({ type: String, description: 'Name', required: true })
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ type: String, description: 'Description', required: true })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Number, description: 'Category ID', required: true })
  @IsInt()
  @IsNotEmpty()
  categoryID: number;

  @ApiProperty({ type: Number, description: 'Price ID', required: true })
  @IsInt()
  @IsNotEmpty()
  priceID: number;

  @ApiProperty({ type: Number, description: 'Stock', required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  stock: number = 0;

  @ApiProperty({ type: Boolean, description: 'Is Available', required: false })
  @IsOptional()
  isAvailable: boolean = true;
}
export class UpdateFoodDto extends CreateFoodDto {}
