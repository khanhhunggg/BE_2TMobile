import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { VendorResponseDto } from '../dto/vendor-response.dto';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

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
