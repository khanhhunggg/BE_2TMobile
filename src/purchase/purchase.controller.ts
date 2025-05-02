import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { ApiOperation } from '@nestjs/swagger';
import {
  CreatePurchaseDto,
  GetPurchaseListDto,
  GetPurchaseByIdDto,
  UpdatePurchaseDto,
} from 'src/dto/purchase.dto';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo đơn hàng mới' })
  public async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(createPurchaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả đơn hàng' })
  public async getAll(@Query() getPurchaseListDto: GetPurchaseListDto) {
    return this.purchaseService.getAllPurchase(getPurchaseListDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy đơn hàng theo ID' })
  public async getById(@Query() id: GetPurchaseByIdDto) {
    return this.purchaseService.getPurchaseById(id);
  }

  @Put('update-purchase')
  @ApiOperation({ summary: 'Cập nhật đơn hàng' })
  public async UpdatePurchase(@Body() data: UpdatePurchaseDto) {
    return await this.purchaseService.updatePurchase(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa đơn hàng' })
  public async delete(@Query() id: GetPurchaseByIdDto) {
    return this.purchaseService.deletePurchase(id);
  }
}
