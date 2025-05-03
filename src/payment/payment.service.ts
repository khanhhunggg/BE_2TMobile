import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { firstValueFrom } from 'rxjs';
import { Order } from 'src/entity/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async doCreatePaymentLink(orderId: number): Promise<string> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new BadRequestException({
        message: 'Không tìm thấy order!!!',
        errors: [
          {
            message: `Order với ID ${orderId} không tồn tại trong hệ thống`,
          },
        ],
      });
    }

    const clientId = this.configService.get<string>('PAYOS_CLIENT_ID');
    const apiKey = this.configService.get<string>('PAYOS_API_KEY');
    const partnerCode = this.configService.get<string>('PAYOS_PARTNER_CODE');
    const checksumKey = this.configService.get<string>('PAYOS_CHECKSUM_KEY');
    const cancelUrl = this.configService.get<string>('PAYOS_CANCEL_URL');
    const returnUrl = this.configService.get<string>('PAYOS_RETURN_URL');

    const orderCode = parseInt(`${order.id}${Date.now().toString().slice(-6)}`);
    const amount = Math.round(order.total_price);
    const description = `Payment for order #${order.id}`;

    const dataString = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
    const signature = crypto
      .createHmac('sha256', checksumKey)
      .update(dataString)
      .digest('hex');

    const payload = {
      orderCode,
      amount,
      description,
      cancelUrl,
      returnUrl,
      signature,
    };

    const headers = {
      'x-client-id': clientId,
      'x-api-key': apiKey,
      'x-partner-code': partnerCode,
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api-merchant.payos.vn/v2/payment-requests',
          payload,
          { headers },
        ),
      );

      if (response.data.code === '231') {
        throw new Error('Đơn thanh toán đã tồn tại. Vui lòng thử lại sau.');
      }

      if (response.data.code === '00' && response.data.data?.checkoutUrl) {
        console.log('Payment URL generated:', response.data.data.checkoutUrl);
        return response.data.data.checkoutUrl;
      }
      throw new Error(
        `Invalid response from PayOS API: ${JSON.stringify(response.data)}`,
      );
    } catch (error) {
      throw new BadRequestException({
        message: 'Lỗi khi tạo đường dẫn thanh toán:',
        errors: [
          {
            message: error.response?.data?.desc || error.message,
            code: error.response?.data?.code,
          },
        ],
      });
    }
  }

  public async getPaymentRequestInfo(orderId: number): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new Error('Order not found');
    }

    const clientId = this.configService.get<string>('PAYOS_CLIENT_ID');
    const apiKey = this.configService.get<string>('PAYOS_API_KEY');
    const partnerCode = this.configService.get<string>('PAYOS_PARTNER_CODE');

    const headers = {
      'x-client-id': clientId,
      'x-api-key': apiKey,
      'x-partner-code': partnerCode,
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://api-merchant.payos.vn/v2/payment-requests/${orderId}`,
          { headers },
        ),
      );

      console.log('Payment Request Info:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting payment request info:', {
        error: error.response?.data || error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      throw new BadRequestException({
        message: 'Lỗi khi lấy thông tin :',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }
}
