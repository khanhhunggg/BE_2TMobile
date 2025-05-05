import { Controller, Get, Param, Query } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorResponseDto } from '../dto/color-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Màu sắc')
@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get('get-all-colors')
  @ApiOperation({ summary: 'Lấy tất cả màu sắc' })
  public async getAllColors(@Query() data: ColorResponseDto) {
    return await this.colorService.getAllColors(data);
  }

  @Get('get-color-by-id')
  @ApiOperation({ summary: 'Lấy màu sắc theo ID' })
  public async getColorById(@Query() id: ColorResponseDto) {
    return await this.colorService.getColorById(id);
  }
}
