import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { PaginationResponseDto } from '../common/common.dto';

export class CreateBankDto {
  @ApiProperty({ type: String, description: 'Bank name', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  bank_name: string;

  @ApiProperty({
    type: String,
    description: 'Bank account number',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  bank_number: string;

  @ApiProperty({ type: String, description: 'User bank name', required: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  user_bank_name: string;
}

export class UpdateBankDto extends CreateBankDto {
  @ApiProperty({ type: Number, description: 'Bank account ID', required: true })
  @IsNotEmpty()
  bank_account_id: number;
}

export class GetBankByIdDto {
  @ApiProperty({ type: Number, description: 'Bank account ID', required: true })
  @IsNotEmpty()
  bank_account_id: number;
}

export class SearchBankDto extends PaginationResponseDto {
  @ApiProperty({ type: String, description: 'Search keyword', required: false })
  @IsOptional()
  @IsString()
  keyword?: string;
}
