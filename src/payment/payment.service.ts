import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { firstValueFrom } from 'rxjs';
import { Order } from 'src/entity/order.entity';
import { Payment } from 'src/entity/payment.entity';
import { Repository } from 'typeorm';
import {
  CreatePaymentLinkDto,
  DeletePaymentDto,
  GetPaymentByIdDto,
  SearchPaymentDto,
  UpdatePaymentDto,
} from 'src/dto/payment.dto';

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

      const amount = Math.round(
        order.orderDetails.reduce((sum, detail) => sum + detail.price, 0),
      );

      const clientId = this.configService.get<string>('PAYOS_CLIENT_ID');
      const apiKey = this.configService.get<string>('PAYOS_API_KEY');
      const checkSumKey = this.configService.get<string>('PAYOS_CHECKSUM_KEY');
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
        expiredAt: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        buyerName: createPaymentLinkDto.buyerName,
        buyerEmail: createPaymentLinkDto.buyerEmail,
        buyerPhone: createPaymentLinkDto.buyerPhone,
        buyerAddress: createPaymentLinkDto.buyerAddress,
      };
      const signature = crypto
        .createHmac('sha256', checkSumKey)
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

  public async doGetAllPayment(searchParams: SearchPaymentDto) {
    try {
      const {
        orderId,
        buyerName,
        buyerEmail,
        page = 1,
        size = 10,
      } = searchParams;

      const queryBuilder = this.paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.order', 'order');

      if (orderId) {
        queryBuilder.andWhere('payment.orderId = :orderId', { orderId });
      }

      if (buyerName) {
        queryBuilder.andWhere('payment.buyerName LIKE :buyerName', {
          buyerName: `%${buyerName}%`,
        });
      }

      if (buyerEmail) {
        queryBuilder.andWhere('payment.buyerEmail LIKE :buyerEmail', {
          buyerEmail: `%${buyerEmail}%`,
        });
      }

      const skip = (page - 1) * size;
      queryBuilder.skip(skip).take(size);

      const [payments, total] = await queryBuilder.getManyAndCount();

      if (!payments || payments.length === 0) {
        throw new BadRequestException({
          message: 'Không tìm thấy thanh toán nào',
        });
      }

      return {
        data: payments,
        pagination: {
          total,
          page,
          size,
          total_pages: Math.ceil(total / size),
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi lấy danh sách thanh toán',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doGetPaymentById(data: GetPaymentByIdDto) {
    try {
      if (!data.id) {
        throw new BadRequestException({
          message: 'ID thanh toán không hợp lệ',
          errors: [
            {
              field: 'id',
              message: 'ID thanh toán không được để trống',
            },
          ],
        });
      }

      const payment = await this.paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.order', 'order')
        .where('payment.id = :id', { id: data.id })
        .getOne();

      if (!payment) {
        throw new BadRequestException({
          message: 'Không tìm thấy thanh toán',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy thanh toán với ID: ${data.id}`,
            },
          ],
        });
      }

      return payment;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi lấy thông tin thanh toán',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doUpdatePayment(data: UpdatePaymentDto) {
    try {
      const existingPayment = await this.paymentRepository.findOne({
        where: { id: data.id },
      });

      if (!existingPayment) {
        throw new BadRequestException({
          message: 'Không tìm thấy thanh toán',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy thanh toán với ID: ${data.id}`,
            },
          ],
        });
      }

      const paymentUpdateData: Partial<Payment> = {};

      // Only update fields that have changed
      if (
        data.buyerName !== undefined &&
        data.buyerName !== existingPayment.buyerName
      ) {
        paymentUpdateData.buyerName = data.buyerName;
      }
      if (
        data.buyerEmail !== undefined &&
        data.buyerEmail !== existingPayment.buyerEmail
      ) {
        paymentUpdateData.buyerEmail = data.buyerEmail;
      }
      if (
        data.buyerPhone !== undefined &&
        data.buyerPhone !== existingPayment.buyerPhone
      ) {
        paymentUpdateData.buyerPhone = data.buyerPhone;
      }
      if (
        data.buyerAddress !== undefined &&
        data.buyerAddress !== existingPayment.buyerAddress
      ) {
        paymentUpdateData.buyerAddress = data.buyerAddress;
      }

      // Only perform update if there are actual changes
      if (Object.keys(paymentUpdateData).length > 0) {
        await this.paymentRepository.update(data.id, paymentUpdateData);
      }

      return await this.doGetPaymentById({ id: data.id });
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi cập nhật thanh toán',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doDeletePayment(data: DeletePaymentDto) {
    try {
      const existingPayment = await this.paymentRepository.findOne({
        where: { id: data.id },
      });

      if (!existingPayment) {
        throw new BadRequestException({
          message: 'Không tìm thấy thanh toán',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy thanh toán với ID: ${data.id}`,
            },
          ],
        });
      }

      await this.paymentRepository.delete(data.id);

      return {
        message: 'Xóa thanh toán thành công',
        data: {
          id: data.id,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi xóa thanh toán',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }
}
