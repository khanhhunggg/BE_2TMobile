import { IsNotEmpty, IsOptional, IsInt, Min, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodImageDto {
  @IsOptional()
  imageId: string;

  @ApiProperty({ type: String, description: 'Image URL', required: true })
  @IsNotEmpty()
  imageUrl: string;

  @IsOptional()
  @IsInt()
  foodId: number;

  @ApiProperty({
    type: Boolean,
    description: 'Is this the primary image for the food',
    required: false,
    default: false,
  })
  @IsOptional()
  isPrimary: boolean;

  @ApiProperty({
    type: Date,
    description: 'Creation timestamp',
    required: false,
  })
  @IsOptional()
  createdAt: Date;
}
export class UpdateFoodImageDto extends CreateFoodImageDto {}
