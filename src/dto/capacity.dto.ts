import { IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateCapacityDto {
  @IsNumber()
  value: number;

  @IsEnum(['MB', 'GB', 'TB'])
  unit: 'MB' | 'GB' | 'TB';

  @IsString()
  @IsOptional()
  display_name?: string;
}

export class UpdateCapacityDto {
  @IsNumber()
  @IsOptional()
  value?: number;

  @IsEnum(['MB', 'GB', 'TB'])
  @IsOptional()
  unit?: 'MB' | 'GB' | 'TB';

  @IsString()
  @IsOptional()
  display_name?: string;
}
