import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VendorBillService } from './vendor-bill.service';
import {
  CreateVendorBillDto,
  DeleteVendorBillDto,
  GetVendorBillByIdDto,
  SearchVendorBillDto,
  UpdateVendorBillDto,
} from './vendor-bill.dto';

@ApiTags('Hóa đơn nhà cung cấp')
@Controller('vendor-bill')
export class VendorBillController {
  constructor(private readonly vendorBillService: VendorBillService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vendor bill' })
  @ApiResponse({ status: 201, description: 'Vendor bill created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createVendorBill(@Body() data: CreateVendorBillDto) {
    return this.vendorBillService.doCreateVendorBill(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vendor bills' })
  @ApiResponse({ status: 200, description: 'List of vendor bills' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async getAllVendorBill(@Query() searchParams: SearchVendorBillDto) {
    return this.vendorBillService.doGetAllVendorBill(searchParams);
  }

  @Get('get-by-id')
  @ApiOperation({ summary: 'Get vendor bill by ID' })
  @ApiResponse({ status: 200, description: 'Vendor bill details' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async getVendorBillById(@Query() data: GetVendorBillByIdDto) {
    return this.vendorBillService.doGetVendorBillById(data);
  }

  @Put()
  @ApiOperation({ summary: 'Update vendor bill' })
  @ApiResponse({ status: 200, description: 'Vendor bill updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateVendorBill(@Body() data: UpdateVendorBillDto) {
    return this.vendorBillService.doUpdateVendorBill(data);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete vendor bill' })
  @ApiResponse({ status: 200, description: 'Vendor bill deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async deleteVendorBill(@Query() data: DeleteVendorBillDto) {
    return this.vendorBillService.doDeleteVendorBill(data);
  }
}
