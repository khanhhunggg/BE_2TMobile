import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const PayOS = require('@payos/node');

@Injectable()
export class PayOSService {
  private payOS: any;

  constructor(private configService: ConfigService) {
    this.payOS = new PayOS(
      this.configService.get<string>('PAYOS_CLIENT_ID'),
      this.configService.get<string>('PAYOS_API_KEY'),
      this.configService.get<string>('PAYOS_CHECKSUM_KEY'),
    );
  }

  async createPaymentLink(data: {
    orderCode: number;
    amount: number;
    description: string;
  }) {
    try {
      const paymentData = {
        orderCode: data.orderCode,
        amount: data.amount,
        description: data.description,
        cancelUrl: this.configService.get<string>('PAYOS_CANCEL_URL'),
        returnUrl: this.configService.get<string>('PAYOS_RETURN_URL'),
        expiredAt: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      };

      const response = await this.payOS.createPaymentLink(paymentData);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
