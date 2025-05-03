import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../entity/order.entity';
import { CreateOrderDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  public async doCreateOrder(order: CreateOrderDto) {
    try {
      const newOrder = this.orderRepository.create({
        product: { id: order.product_id },
        user: { id: order.user_id },
        cart: order.cart_id ? { id: order.cart_id } : null,
        quantity: order.quantity,
        total_price: order.total_price,
        payment_method: order.payment_method,
        expected_delivery_date: order.expected_delivery_date,
        status: order.status || OrderStatus.PENDING,
      });

      return await this.orderRepository.save(newOrder);
    } catch (error) {
      throw new BadRequestException({
        message: 'Lỗi khi tạo đơn hàng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doGetAllOrders() {
    try {
      return await this.orderRepository.find({
        relations: ['product', 'user', 'cart'],
      });
    } catch (error) {
      throw new BadRequestException({
        message: 'Lỗi khi lấy danh sách đơn hàng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doGetOrderById(id: number) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['product', 'user', 'cart'],
      });
      if (!order) {
        throw new BadRequestException({
          message: 'Không tìm thấy đơn hàng',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy đơn hàng với ID: ${id}`,
            },
          ],
        });
      }
      return order;
    } catch (error) {
      throw new BadRequestException({
        message: 'Lỗi khi lấy thông tin đơn hàng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doUpdateOrder(id: number, updateData: Partial<CreateOrderDto>) {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new BadRequestException({
          message: 'Không tìm thấy đơn hàng',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy đơn hàng với ID: ${id}`,
            },
          ],
        });
      }

      const updatedOrder = this.orderRepository.merge(order, {
        product: updateData.product_id
          ? { id: updateData.product_id }
          : undefined,
        user: updateData.user_id ? { id: updateData.user_id } : undefined,
        cart: updateData.cart_id ? { id: updateData.cart_id } : undefined,
        quantity: updateData.quantity,
        total_price: updateData.total_price,
        payment_method: updateData.payment_method,
        expected_delivery_date: updateData.expected_delivery_date,
        status: updateData.status,
      });

      return await this.orderRepository.save(updatedOrder);
    } catch (error) {
      throw new BadRequestException({
        message: 'Lỗi khi cập nhật đơn hàng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doDeleteOrder(id: number) {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        throw new BadRequestException({
          message: 'Không tìm thấy đơn hàng',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy đơn hàng với ID: ${id}`,
            },
          ],
        });
      }
      await this.orderRepository.remove(order);
      return { message: 'Xóa đơn hàng thành công' };
    } catch (error) {
      throw new BadRequestException({
        message: 'Lỗi khi xóa đơn hàng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }
}
