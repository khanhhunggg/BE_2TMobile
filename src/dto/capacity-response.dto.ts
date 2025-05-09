import { CapacityUnit } from '../entity/capacity.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsEnum, IsString } from 'class-validator';

export class CapacityResponseDto {
  @ApiProperty({ type: Number, description: 'ID', required: false })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    type: Number,
    description: 'Giá trị dung lượng',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiProperty({
    type: String,
    description: 'Đơn vị dung lượng',
    enum: CapacityUnit,
    example: CapacityUnit.GB,
    required: false,
  })
  @IsEnum(CapacityUnit)
  @IsOptional()
  unit?: CapacityUnit;

  @ApiProperty({
    type: String,
    description: 'Tên hiển thị của dung lượng',
    required: false,
  })
  @IsString()
  @IsOptional()
  display_name?: string;
}
