import { IsString, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  logo?: string;
}

export class UpdateProviderDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  logo?: string;
}
