import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PayOSService } from './payos.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatePaymentLinkDto,
  PaymentLinkResponseDto,
  DeletePaymentDto,
  GetPaymentByIdDto,
  SearchPaymentDto,
  UpdatePaymentDto,
  SimpleCreatePaymentDto,
} from 'src/dto/payment.dto';

@ApiTags('Thanh toán')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly payOS: PayOSService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Tạo thanh toán mới' })
  @ApiResponse({ status: 200, description: 'Return payment information' })
  public async createPayment(@Body() body: SimpleCreatePaymentDto) {
    try {
      const paymentBody = {
        orderCode: body.orderId,
        amount: body.amount,
        description: body.description,
      };

      const paymentLinkRes = await this.payOS.createPaymentLink(paymentBody);
      let payment = null;
      if (paymentLinkRes.checkoutUrl) {
        const paymentBody = {
          orderId: body.orderId,
          buyerName: body.buyerName,
          buyerEmail: body.buyerEmail,
          buyerPhone: body.buyerPhone,
          buyerAddress: body.buyerAddress,
        };
        payment = await this.paymentService.doCreatePayment(paymentBody);
      }

      return {
        error: 0,
        message: 'Success',
        data: {
          bin: paymentLinkRes.bin,
          checkoutUrl: paymentLinkRes.checkoutUrl,
          accountNumber: paymentLinkRes.accountNumber,
          accountName: paymentLinkRes.accountName,
          amount: paymentLinkRes.amount,
          description: paymentLinkRes.description,
          orderCode: paymentLinkRes.orderCode,
          qrCode: paymentLinkRes.qrCode,
        },
        payment: payment,
      };
    } catch (error) {
      console.log(error);
      return {
        error: -1,
        message: error.message,
        data: null,
      };
    }
  }

  // @Post('create-url')
  // @ApiOperation({ summary: 'Tạo phiên thanh toán' })
  // @ApiResponse({ status: 200, description: 'Return payment URL' })
  // public async doCreatePaymentUrl(
  //   @Body() createPaymentLinkDto: CreatePaymentLinkDto,
  // ): Promise<PaymentLinkResponseDto> {
  //   const checkoutUrl =
  //     await this.paymentService.createPaymentLink(createPaymentLinkDto);
  //   return { checkoutUrl };
  // }

  @Get('payment-info/:orderId')
  @ApiOperation({ summary: 'Get payment request information' })
  @ApiResponse({
    status: 200,
    description: 'Return payment request information',
  })
  async getPaymentInfo(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.paymentService.getPaymentRequestInfo(orderId);
  }

  // @Post('create-payment-link')
  // @ApiOperation({ summary: 'Tạo link thanh toán' })
  // public async CreatePaymentLink(@Body() data: CreatePaymentLinkDto) {
  //   return await this.paymentService.createPaymentLink(data);
  // }

  @Get('get-all-payment')
  @ApiOperation({ summary: 'Lấy tất cả thanh toán' })
  public async GetAllPayment(@Query() searchParams: SearchPaymentDto) {
    return await this.paymentService.doGetAllPayment(searchParams);
  }

  @Get('get-payment-by-id')
  @ApiOperation({ summary: 'Lấy thanh toán theo ID' })
  public async GetPaymentById(@Query() data: GetPaymentByIdDto) {
    return await this.paymentService.doGetPaymentById(data);
  }

  @Put('update-payment')
  @ApiOperation({ summary: 'Cập nhật thanh toán' })
  public async UpdatePayment(@Body() data: UpdatePaymentDto) {
    return await this.paymentService.doUpdatePayment(data);
  }

  @Delete('delete-payment')
  @ApiOperation({ summary: 'Xóa thanh toán' })
  public async DeletePayment(@Query() data: DeletePaymentDto) {
    return await this.paymentService.doDeletePayment(data);
  }
}
