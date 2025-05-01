import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class VendorResponseDto {
  @ApiProperty({ type: Number, description: 'ID', required: false })
  @IsNumber()
  id?: number;

  @ApiProperty({
    type: String,
    description: 'Mã nhà cung cấp',
    required: false,
  })
  @IsString()
  vendor_code?: string;

  @ApiProperty({
    type: String,
    description: 'Tên nhà cung cấp',
    required: false,
  })
  @IsString()
  name?: string;
}
