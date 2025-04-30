import { IsString, IsOptional } from 'class-validator';

export class CreateColorDto {
  @IsString()
  name: string;

  @IsString()
  color_code: string;
}

export class UpdateColorDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  color_code?: string;
}
