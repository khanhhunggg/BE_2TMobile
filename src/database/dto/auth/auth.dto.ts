import { ApiProperty } from '@nestjs/swagger';
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

//Tự tạo
export class UserJwtDto {
  id: string;
  userName: string;
  isAdmin: boolean;
  fcmToken?: string;
}

export class SignUpDto {
  @ApiProperty({ type: String, description: 'Email', required: true })
  @IsOptional()
  @IsEmail()
  Email: string;

  @ApiProperty({ type: String, description: 'PassWord', required: true })
  @IsString()
  Password: string;

  @ApiProperty({ type: String, description: 'FullName', required: true })
  @IsOptional()
  @IsString()
  FullName: string;

  @ApiProperty({ type: String, description: 'PhoneNumber', required: true })
  @IsOptional()
  @IsPhoneNumber()
  PhoneNumber: string;
}
