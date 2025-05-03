import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatePaymentLinkDto,
  PaymentLinkResponseDto,
} from 'src/dto/payment.dto';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-url')
  @ApiOperation({ summary: 'Tạo phiên thanh toán' })
  @ApiResponse({ status: 200, description: 'Return payment URL' })
  public async doCreatePaymentUrl(
    @Body() createPaymentLinkDto: CreatePaymentLinkDto,
  ): Promise<PaymentLinkResponseDto> {
    const { orderId } = createPaymentLinkDto;
    const checkoutUrl = await this.paymentService.doCreatePaymentLink(orderId);
    return { checkoutUrl };
  }

  @Get('payment-info/:orderId')
  @ApiOperation({ summary: 'Get payment request information' })
  @ApiResponse({
    status: 200,
    description: 'Return payment request information',
  })
  async getPaymentInfo(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.paymentService.getPaymentRequestInfo(orderId);
  }
}
