import { Controller, Post, Body } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePurchaseDto } from 'src/dto/purchase.dto';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new purchase' })
  public async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(createPurchaseDto);
  }
}
