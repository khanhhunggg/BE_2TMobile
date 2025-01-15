import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
  IsDate,
} from 'class-validator';

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

export class SignInDto {
  @ApiProperty({ type: String, description: 'Email', required: true })
  @IsOptional()
  @IsEmail()
  Email: string;

  @ApiProperty({ type: String, description: 'PassWord', required: true })
  @IsString()
  Password: string;
}

export class DeleteUserDto {
  @IsString()
  Username: string;
}
