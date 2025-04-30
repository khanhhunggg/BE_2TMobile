import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateSpecsDto {
  @ApiProperty({
    type: String,
    description: 'Kích thước màn hình',
    required: false,
  })
  @IsString()
  @IsOptional()
  screen_size?: string;

  @ApiProperty({ type: String, description: 'Độ phân giải', required: false })
  @IsString()
  @IsOptional()
  resolution?: string;

  @ApiProperty({ type: String, description: 'Chipset', required: false })
  @IsString()
  @IsOptional()
  chipset?: string;

  @ApiProperty({ type: String, description: 'RAM', required: false })
  @IsString()
  @IsOptional()
  ram?: string;

  @ApiProperty({ type: String, description: 'Hệ điều hành', required: false })
  @IsString()
  @IsOptional()
  os?: string;

  @ApiProperty({ type: String, description: 'Dung lượng pin', required: false })
  @IsString()
  @IsOptional()
  battery_capacity?: string;

  @ApiProperty({ type: String, description: 'Công nghệ sạc', required: false })
  @IsString()
  @IsOptional()
  charging_tech?: string;
}
