import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProductDetailDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  @IsOptional()
  color_id?: number;

  @IsNumber()
  @IsOptional()
  capacity_id?: number;

  @IsNumber()
  @IsOptional()
  stock_quantity?: number;

  @IsString()
  @IsOptional()
  serial_number?: string;
}

export class UpdateProductDetailDto {
  @IsNumber()
  @IsOptional()
  color_id?: number;

  @IsNumber()
  @IsOptional()
  capacity_id?: number;

  @IsNumber()
  @IsOptional()
  stock_quantity?: number;

  @IsString()
  @IsOptional()
  serial_number?: string;
}
