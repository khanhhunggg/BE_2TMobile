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

  public async createPaymentLink(createPaymentLinkDto: CreatePaymentLinkDto) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: createPaymentLinkDto.orderId },
        relations: ['orderDetails'],
      });

      if (!order) {
        throw new Error('Order not found');
      }

      // Calculate total amount from order details
      const amount = Math.round(
        order.orderDetails.reduce((sum, detail) => sum + detail.total_price, 0),
      );

      const clientId = this.configService.get<string>('PAYOS_CLIENT_ID');
      const apiKey = this.configService.get<string>('PAYOS_API_KEY');
      const partnerCode = this.configService.get<string>('PAYOS_PARTNER_CODE');
      const returnUrl = this.configService.get<string>('PAYOS_RETURN_URL');
      const cancelUrl = this.configService.get<string>('PAYOS_CANCEL_URL');

      const orderCode = `ORDER_${order.id}_${Date.now()}`;
      const description = `Thanh toan don hang ${order.id}`;

      const data = {
        orderCode,
        amount,
        description,
        cancelUrl,
        returnUrl,
        expiredAt: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
        buyerName: createPaymentLinkDto.buyerName,
        buyerEmail: createPaymentLinkDto.buyerEmail,
        buyerPhone: createPaymentLinkDto.buyerPhone,
        buyerAddress: createPaymentLinkDto.buyerAddress,
      };

      const signature = crypto
        .createHmac('sha256', apiKey)
        .update(JSON.stringify(data))
        .digest('hex');

      const headers = {
        'x-client-id': clientId,
        'x-api-key': apiKey,
        'x-partner-code': partnerCode,
        'Content-Type': 'application/json',
      };

      const response = await firstValueFrom(
        this.httpService.post(
          'https://api-merchant.payos.vn/v2/payment-requests',
          {
            ...data,
            signature,
          },
          { headers },
        ),
      );

      // Save payment information
      const payment = this.paymentRepository.create({
        orderId: order.id,
        buyerName: createPaymentLinkDto.buyerName,
        buyerEmail: createPaymentLinkDto.buyerEmail,
        buyerPhone: createPaymentLinkDto.buyerPhone,
        buyerAddress: createPaymentLinkDto.buyerAddress,
        expiredAt: data.expiredAt,
      });

      await this.paymentRepository.save(payment);

      return response.data;
    } catch (error) {
      console.error('Error creating payment link:', {
        error: error.response?.data || error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      throw new BadRequestException({
        message: 'Lỗi khi tạo link thanh toán',
        errors: [{ message: error.message }],
      });
    }
  }

  public async getPaymentRequestInfo(orderId: number): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['orderDetails'],
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
        message: 'Lỗi khi lấy thông tin thanh toán',
        errors: [{ message: error.message }],
      });
    }
  }
}
