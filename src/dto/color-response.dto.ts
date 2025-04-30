import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ColorResponseDto {
  @ApiProperty({ type: Number, description: 'ID', required: false })
  @IsNumber()
  id?: number;

  @ApiProperty({ type: String, description: 'Tên sản phẩm', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ type: String, description: 'Tên sản phẩm', required: false })
  @IsString()
  color_code: string;

  @ApiProperty({ type: Number, description: 'Trang', required: false })
  @IsNumber()
  page: number;

  @ApiProperty({ type: Number, description: 'Kích thước', required: false })
  @IsNumber()
  size: number;
}
