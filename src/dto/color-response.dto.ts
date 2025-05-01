import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ColorResponseDto {
  @ApiProperty({ type: Number, description: 'ID', required: false })
  @IsNumber()
  id?: number;

  @ApiProperty({ type: String, description: 'Tên màu sắc', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ type: String, description: 'Mã màu', required: false })
  @IsString()
  color_code: string;
}
