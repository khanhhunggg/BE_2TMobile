import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreatePaymentLinkDto,
  DeletePaymentDto,
  GetPaymentByIdDto,
  SearchPaymentDto,
  UpdatePaymentDto,
} from 'src/dto/payment.dto';
import { PurchaseService } from './purchase.service';

@ApiTags('Thanh toán lưu payment')
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('create-payment')
  @ApiOperation({ summary: 'Tạo thanh toán' })
  public async CreatePayment(@Body() data: CreatePaymentLinkDto) {
    return await this.purchaseService.doCreatePayment(data);
  }

  @Get('get-all-payment')
  @ApiOperation({ summary: 'Lấy tất cả thanh toán' })
  public async GetAllPayment(@Query() searchParams: SearchPaymentDto) {
    return await this.purchaseService.doGetAllPayment(searchParams);
  }

  @Get('get-payment-by-id')
  @ApiOperation({ summary: 'Lấy thanh toán theo ID' })
  public async GetPaymentById(@Query() data: GetPaymentByIdDto) {
    return await this.purchaseService.doGetPaymentById(data);
  }

  @Put('update-payment')
  @ApiOperation({ summary: 'Cập nhật thanh toán' })
  public async UpdatePayment(@Body() data: UpdatePaymentDto) {
    return await this.purchaseService.doUpdatePayment(data);
  }

  @Delete('delete-payment')
  @ApiOperation({ summary: 'Xóa thanh toán' })
  public async DeletePayment(@Query() data: DeletePaymentDto) {
    return await this.purchaseService.doDeletePayment(data);
  }
}
