import { CapacityUnit } from '../entity/capacity.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CapacityResponseDto {
  @ApiProperty({ type: Number, description: 'ID', required: false })
  id?: number;

  @ApiProperty({
    type: Number,
    description: 'Giá trị dung lượng',
    required: false,
  })
  value?: number;

  @ApiProperty({
    type: String,
    description: 'Đơn vị dung lượng',
    enum: CapacityUnit,
    example: CapacityUnit.GB,
  })
  unit?: CapacityUnit;

  @ApiProperty({
    type: String,
    description: 'Tên hiển thị của dung lượng',
    required: false,
  })
  display_name?: string;
}
