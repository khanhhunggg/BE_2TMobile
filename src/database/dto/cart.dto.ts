import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({ type: Number, description: 'User ID', required: true })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ type: Number, description: 'Food ID', required: true })
  @IsInt()
  @IsNotEmpty()
  foodId: number;

  @ApiProperty({
    type: Number,
    description: 'Quantity',
    required: true,
    default: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number = 1;
}

export class UpdateCartDto extends CreateCartDto {}
