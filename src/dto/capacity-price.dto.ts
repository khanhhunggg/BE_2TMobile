import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCapacityPriceDto {
  @ApiProperty({ type: Number, description: 'Giá tiền', required: true })
  @IsNumber()
  price: number;

  @ApiProperty({ type: Number, description: 'Giá khuyến mãi', required: false })
  @IsNumber()
  @IsOptional()
  discount_price?: number;
}
