import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class ColorResponseDto {
  @ApiProperty({ type: Number, description: 'ID', required: false })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ type: String, description: 'Tên màu sắc', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, description: 'Mã màu', required: false })
  @IsString()
  @IsOptional()
  color_code?: string;
}
