import { Controller, Get, Param, Query } from '@nestjs/common';
import { CapacityService } from './capacity.service';
import { CapacityResponseDto } from '../dto/capacity-response.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Dung lượng')
@Controller('capacities')
export class CapacityController {
  constructor(private readonly capacityService: CapacityService) {}

  @Get('get-all-capacities')
  @ApiOperation({ summary: 'Lấy tất cả dung lượng' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách dung lượng',
    type: CapacityResponseDto,
    isArray: true,
  })
  public async getAllCapacities(@Query() data: CapacityResponseDto) {
    return await this.capacityService.getAllCapacities(data);
  }

  @Get('get-capacity-by-id')
  @ApiOperation({ summary: 'Lấy dung lượng theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin dung lượng',
    type: CapacityResponseDto,
  })
  public async getCapacityById(@Query() id: CapacityResponseDto) {
    return await this.capacityService.getCapacityById(id);
  }
}
