import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { firstValueFrom } from 'rxjs';
import { Order } from 'src/entity/order.entity';
import { Payment } from 'src/entity/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentLinkDto } from 'src/dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async doCreatePaymentLink(
    data: CreatePaymentLinkDto,
  ): Promise<string> {
    const order = await this.orderRepository.findOne({
      where: { id: data.orderId },
    });
    if (!order) {
      throw new BadRequestException({
        message: 'Không tìm thấy order!!!',
        errors: [
          {
            message: `Order với ID ${data.orderId} không tồn tại trong hệ thống`,
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
      buyerName: data.buyerName,
      buyerEmail: data.buyerEmail,
      buyerPhone: data.buyerPhone,
      buyerAddress: data.buyerAddress,
      expiredAt: data.expiredAt,
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

      if (
        response.data.code !==
          this.configService.get<string>('PAYOS_SUCCESS_CODE') ||
        !response.data.data?.checkoutUrl
      ) {
        throw new BadRequestException(
          response.data.desc ||
            `Invalid response from PayOS API: ${JSON.stringify(response.data)}`,
        );
      } else {
        const payment = new Payment();
        payment.orderId = data.orderId;
        payment.buyerName = data.buyerName;
        payment.buyerEmail = data.buyerEmail;
        payment.buyerPhone = data.buyerPhone;
        payment.buyerAddress = data.buyerAddress;
        payment.expiredAt = data.expiredAt;
        await this.paymentRepository.save(payment);

        return response.data.data.checkoutUrl;
      }
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
