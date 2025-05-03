import { Injectable } from '@nestjs/common';
import PayOS = require('@payos/node');
import { CheckoutRequestType, WebhookDataDto } from '../dto/pay-os.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import * as crypto from 'crypto';

@Injectable()
export class PayosService {
  private payos: PayOS;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
    this.payos = new PayOS(
      process.env.PAYOS_CLIENT_ID,
      process.env.PAYOS_API_KEY,
      process.env.PAYOS_CHECKSUM_KEY,
    );
  }

  async createPaymentLink(data: CheckoutRequestType) {
    return await this.payos.createPaymentLink(data);
  }
  async verifyWebhookSignature(webhookData: WebhookDataDto): Promise<boolean> {
    try {
      await this.payos.verifyPaymentWebhookData(webhookData);
      return true;
    } catch (error) {
      console.error('Webhook verification error:', error);
      return false;
    }
  }

  async processPaymentWebhook(webhookData: WebhookDataDto) {
    const payment = this.paymentRepository.create({
      paymentId: webhookData.data.paymentId,
      orderCode: webhookData.data.orderCode,
      amount: webhookData.data.amount,
      description: webhookData.data.description,
      transactionTime: new Date(webhookData.data.transactionTime),
      status: webhookData.data.status,
      paymentMethod: webhookData.data.paymentMethod,
    });
    console.log(payment);
  }

  generateTestSignature(data: WebhookDataDto): string {
    const checksumKey = process.env.PAYOS_CHECKSUM_KEY;
    if (!checksumKey) {
      throw new Error('PAYOS_CHECKSUM_KEY is not defined');
    }

    const dataToSign = { ...data };
    delete dataToSign.signature;

    const dataStr = JSON.stringify(dataToSign).replace(/\s/g, '');
    console.log('Data string for signature:', dataStr);

    const signature = crypto
      .createHmac('sha256', checksumKey)
      .update(dataStr)
      .digest('hex');

    console.log('Generated signature:', signature);
    return signature;
  }
}
