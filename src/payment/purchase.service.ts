import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePaymentLinkDto,
  GetPaymentByIdDto,
  SearchPaymentDto,
  UpdatePaymentDto,
  DeletePaymentDto,
} from 'src/dto/payment.dto';
import { Payment } from 'src/entity/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  public async doCreatePayment(data: CreatePaymentLinkDto): Promise<Payment> {
    try {
      if (!data.orderId) {
        throw new BadRequestException({
          message: 'Thông tin thanh toán không hợp lệ',
          errors: [
            {
              field: 'orderId',
              message: 'Mã đơn hàng không được để trống',
            },
          ],
        });
      }

      if (!data.buyerName) {
        throw new BadRequestException({
          message: 'Thông tin thanh toán không hợp lệ',
          errors: [
            {
              field: 'buyerName',
              message: 'Tên người mua không được để trống',
            },
          ],
        });
      }

      if (!data.buyerEmail) {
        throw new BadRequestException({
          message: 'Thông tin thanh toán không hợp lệ',
          errors: [
            {
              field: 'buyerEmail',
              message: 'Email người mua không được để trống',
            },
          ],
        });
      }

      if (!data.buyerPhone) {
        throw new BadRequestException({
          message: 'Thông tin thanh toán không hợp lệ',
          errors: [
            {
              field: 'buyerPhone',
              message: 'Số điện thoại người mua không được để trống',
            },
          ],
        });
      }

      if (!data.buyerAddress) {
        throw new BadRequestException({
          message: 'Thông tin thanh toán không hợp lệ',
          errors: [
            {
              field: 'buyerAddress',
              message: 'Địa chỉ người mua không được để trống',
            },
          ],
        });
      }

      const payment = this.paymentRepository.create({
        orderId: data.orderId,
        buyerName: data.buyerName,
        buyerEmail: data.buyerEmail,
        buyerPhone: data.buyerPhone,
        buyerAddress: data.buyerAddress,
      });

      return await this.paymentRepository.save(payment);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi tạo thanh toán',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doGetAllPayment(searchParams: SearchPaymentDto) {
    try {
      const {
        orderId,
        buyerName,
        buyerEmail,
        buyerPhone,
        page = 1,
        size = 10,
        sort_by = 'created_at',
        order = 'DESC',
      } = searchParams;

      const queryBuilder = this.paymentRepository
        .createQueryBuilder('payment')
        .select([
          'payment.id',
          'payment.orderId',
          'payment.buyerName',
          'payment.buyerEmail',
          'payment.buyerPhone',
          'payment.buyerAddress',
          'payment.created_at',
          'payment.updated_at',
        ]);

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

      if (buyerPhone) {
        queryBuilder.andWhere('payment.buyerPhone LIKE :buyerPhone', {
          buyerPhone: `%${buyerPhone}%`,
        });
      }

      if (sort_by === 'created_at') {
        queryBuilder.orderBy('payment.created_at', order);
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
      if (error instanceof BadRequestException) {
        throw error;
      }
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

      const payment = await this.paymentRepository.findOne({
        where: { id: data.id },
      });

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
      if (error instanceof BadRequestException) {
        throw error;
      }
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

      const paymentUpdateData = {
        orderId: data.orderId,
        buyerName: data.buyerName,
        buyerEmail: data.buyerEmail,
        buyerPhone: data.buyerPhone,
        buyerAddress: data.buyerAddress,
      };

      Object.keys(paymentUpdateData).forEach(
        (key) =>
          paymentUpdateData[key] === undefined && delete paymentUpdateData[key],
      );

      await this.paymentRepository.update(data.id, paymentUpdateData);

      return await this.doGetPaymentById({ id: data.id });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
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
