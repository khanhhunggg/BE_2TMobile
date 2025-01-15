import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  Username: string;

  @IsString()
  PasswordHash: string;

  @IsOptional()
  @IsString()
  FullName?: string;

  @IsOptional()
  @IsEmail()
  Email?: string;

  @IsOptional()
  @IsPhoneNumber()
  PhoneNumber?: string;

  @IsOptional()
  @IsString()
  Address?: string;

  @IsEnum(['Admin', 'Customer'])
  Role: 'Admin' | 'Customer';

  @IsEnum(['Male', 'Female', 'Other'])
  Gender: 'Male' | 'Female' | 'Other';

  @IsOptional()
  @IsDate()
  BirthDate?: string;
}

export class UpdateUserDto extends CreateUserDto {}

export class DeleteUserDto {
  @IsString()
  Username: string;
}
