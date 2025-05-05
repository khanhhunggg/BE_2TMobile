import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

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

export class CreateVendorDto {
  @ApiProperty({
    type: String,
    description: 'Mã nhà cung cấp',
    required: true,
  })
  @IsString()
  vendor_code: string;

  @ApiProperty({
    type: String,
    description: 'Tên nhà cung cấp',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Số điện thoại',
    required: false,
  })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    type: String,
    description: 'Email',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    type: String,
    description: 'Địa chỉ',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;
}

export class UpdateVendorDto {
  @ApiProperty({
    type: Number,
    description: 'ID nhà cung cấp',
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Mã nhà cung cấp',
    required: false,
  })
  @IsString()
  @IsOptional()
  vendor_code?: string;

  @ApiProperty({
    type: String,
    description: 'Tên nhà cung cấp',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    description: 'Số điện thoại',
    required: false,
  })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    type: String,
    description: 'Email',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    type: String,
    description: 'Địa chỉ',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    type: Number,
    description: 'ID người liên hệ',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  contact_person_id?: number;
}

export class DeleteVendorDto {
  @ApiProperty({
    type: Number,
    description: 'ID nhà cung cấp',
    required: true,
  })
  @IsNumber()
  id: number;
}
