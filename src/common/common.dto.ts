import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class PaginationResponseDto {
  @ApiProperty({
    type: Number,
    description: 'Số trang',
    required: false,
    default: 1,
    minimum: 1,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    type: Number,
    description: 'Số lượng bản ghi mỗi trang',
    required: false,
    default: 10,
    minimum: 1,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  size?: number = 10;
}
export class SearchDto {
  @ApiProperty({ type: String, description: 'Keyword', required: false })
  @IsString()
  keyword?: string;
}
