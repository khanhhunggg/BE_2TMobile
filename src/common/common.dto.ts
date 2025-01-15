import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class PaginationResponseDto {
  @ApiProperty({ type: Number, description: 'Page', required: false })
  @IsNumber()
  page?: number;
  @ApiProperty({ type: Number, description: 'Size', required: false })
  @IsNumber()
  size?: number;
}
