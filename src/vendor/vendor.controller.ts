import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { VendorResponseDto } from '../dto/vendor-response.dto';
import {
  CreateVendorDto,
  UpdateVendorDto,
  DeleteVendorDto,
} from '../dto/vendor-response.dto';

@ApiTags('Nhà cung cấp')
@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('create')
  @ApiOperation({ summary: 'Tạo mới nhà cung cấp' })
  public async createVendor(@Body() data: CreateVendorDto) {
    return await this.vendorService.doCreateVendor(data);
  }

  @Put('update')
  @ApiOperation({ summary: 'Cập nhật thông tin nhà cung cấp' })
  public async updateVendor(@Body() data: UpdateVendorDto) {
    return await this.vendorService.doUpdateVendor(data);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Xóa nhà cung cấp' })
  public async deleteVendor(@Query() data: DeleteVendorDto) {
    return await this.vendorService.doDeleteVendor(data);
  }

  @Get('get-all-vendors')
  @ApiOperation({ summary: 'Lấy tất cả nhà cung cấp' })
  public async getAllVendors(@Query() data: VendorResponseDto) {
    return await this.vendorService.getAllVendors(data);
  }

  @Get('get-vendor-by-id')
  @ApiOperation({ summary: 'Lấy nhà cung cấp theo ID' })
  public async getVendorById(@Query() id: VendorResponseDto) {
    return await this.vendorService.getVendorById(id);
  }
}
