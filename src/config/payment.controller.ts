import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Res,
  Req,
  Ip,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response, Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('create-payment-url')
  async createPaymentUrl(
    @Query('amount') amount: number,
    @Query('bankCode') bankCode?: string,
    @Ip() clientIp?: string,
  ) {
    return this.paymentService.createPaymentUrl(amount, bankCode, clientIp);
  }

  @Get('vnpay-return')
  async vnpayReturn(@Query() query: any, @Res() res: Response) {
    const result = await this.paymentService.verifyPayment(query);

    if (result.isValid) {
      if (result.responseCode === '00') {
        return res.redirect('/payment/success');
      } else {
        return res.redirect('/payment/failed');
      }
    } else {
      return res.redirect('/payment/invalid');
    }
  }

  @Get('vnpay-ipn')
  async vnpayIpn(@Query() query: any) {
    const result = await this.paymentService.verifyPayment(query);

    if (result.isValid) {
      if (result.responseCode === '00') {
        return { RspCode: '00', Message: 'Success' };
      } else {
        return { RspCode: '00', Message: 'Success' };
      }
    } else {
      return { RspCode: '97', Message: 'Checksum failed' };
    }
  }

  @Post('query-transaction')
  async queryTransaction(
    @Body('orderId') orderId: string,
    @Body('transDate') transDate: string,
  ) {
    return this.paymentService.queryTransaction(orderId, transDate);
  }

  @Post('refund')
  async refund(
    @Body('orderId') orderId: string,
    @Body('transDate') transDate: string,
    @Body('amount') amount: number,
    @Body('transType') transType: string,
    @Body('user') user: string,
  ) {
    return this.paymentService.refund(
      orderId,
      transDate,
      amount,
      transType,
      user,
    );
  }
}
