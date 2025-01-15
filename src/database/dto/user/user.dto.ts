import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
  IsDate,
  IsArray,
  IsNumber,
} from 'class-validator';
import { PaginationResponseDto } from 'src/common/common.dto';

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

export class SendEmailForgotPasswordDto {
  @ApiProperty({ type: String, description: 'Email', required: true })
  @IsEmail()
  Email: string;

  @ApiProperty({ type: String, description: 'OldPassWord', required: true })
  @IsString()
  OldPassWord: string;

  @ApiProperty({ type: String, description: 'NewPassWord', required: true })
  @IsString()
  NewPassWord: string;
}
export class GetUserByEmailDto extends PaginationResponseDto {
  @ApiProperty({ type: String, description: 'Email', required: true })
  @IsEmail()
  Email: string;
}

export class DeleteUserDto {
  @IsString()
  Username: string;
}
