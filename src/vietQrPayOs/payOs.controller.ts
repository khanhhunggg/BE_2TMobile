import { Body, Controller, Post } from '@nestjs/common';
import { PayosService } from './payOs.service';
import { CheckoutRequestType, WebhookDataDto } from '../dto/pay-os.dto';

@Controller('payos')
export class PayosController {
  constructor(private readonly payosService: PayosService) {}

  @Post('create-link')
  async createLink(@Body() body: CheckoutRequestType) {
    const result = await this.payosService.createPaymentLink({
      ...body,
      returnUrl: process.env.PAYOS_RETURN_URL,
      cancelUrl: process.env.PAYOS_CANCEL_URL,
    });
    return {
      checkoutUrl: result.checkoutUrl,
      paymentLinkId: result.paymentLinkId,
    };
  }

  @Post('webhook')
  async handleWebhook(@Body() webhookData: WebhookDataDto) {
    const isValid = await this.payosService.verifyWebhookSignature(webhookData);
    if (!isValid) {
      throw new Error('Invalid webhook signature');
    }
    await this.payosService.processPaymentWebhook(webhookData);
    return { success: true };
  }

  @Post('test-signature')
  async getTestSignature(@Body() data: WebhookDataDto) {
    const signature = this.payosService.generateTestSignature(data);
    return { signature };
  }
}
