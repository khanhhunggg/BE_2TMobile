import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../entity/order.entity';
import { OrderDetail } from '../entity/order-detail.entity';
import { CreateOrderDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  public async doCreateOrder(orderData: CreateOrderDto) {
    try {
      // Check if order exists for this user
      const existingOrder = await this.orderRepository.findOne({
        where: {
          user: { id: orderData.user_id },
          status: OrderStatus.PENDING,
        },
        relations: ['orderDetails', 'orderDetails.productDetail'],
      });

      let order;
      if (existingOrder) {
        // If order exists, use the existing order
        order = existingOrder;
      } else {
        // Create new order if it doesn't exist
        const newOrder = this.orderRepository.create({
          user: { id: orderData.user_id },
          payment_method: orderData.payment_method,
          expected_delivery_date: orderData.expected_delivery_date,
          status: orderData.status || OrderStatus.PENDING,
        });
        order = await this.orderRepository.save(newOrder);
      }

      // Process order details
      for (const detail of orderData.order_details) {
        // Check if product detail already exists in order details
        const existingDetail = order.orderDetails?.find(
          (od) => od.productDetail.id === detail.product_detail_id,
        );

        if (existingDetail) {
          existingDetail.quantity += detail.quantity;
          existingDetail.total_price += detail.total_price;
          await this.orderDetailRepository.save(existingDetail);
        } else {
          const newOrderDetail = this.orderDetailRepository.create({
            order: { id: order.id },
            productDetail: { id: detail.product_detail_id },
            quantity: detail.quantity,
            total_price: detail.total_price,
          });
          await this.orderDetailRepository.save(newOrderDetail);
        }
      }

      return await this.orderRepository.findOne({
        where: { id: order.id },
        relations: ['user', 'orderDetails', 'orderDetails.productDetail'],
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi tạo đơn hàng',
        errors: [{ message: error.message }],
      });
    }
  }

  public async doGetAllOrders() {
    try {
      return await this.orderRepository.find({
        relations: ['user', 'orderDetails', 'orderDetails.productDetail'],
      });
    } catch (error) {
      throw new BadRequestException({
        message: 'Lỗi khi lấy danh sách đơn hàng',
        errors: [{ message: error.message }],
      });
    }
  }

  public async doGetOrderById(id: number) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['user', 'orderDetails', 'orderDetails.productDetail'],
      });
      if (!order) {
        throw new BadRequestException({
          message: 'Không tìm thấy đơn hàng',
          errors: [
            { field: 'id', message: `Không tìm thấy đơn hàng với ID: ${id}` },
          ],
        });
      }
      return order;
    } catch (error) {
      throw new BadRequestException({
        message: 'Lỗi khi lấy thông tin đơn hàng',
        errors: [{ message: error.message }],
      });
    }
  }

  public async doUpdateOrder(id: number, updateData: Partial<CreateOrderDto>) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['orderDetails', 'orderDetails.productDetail'],
      });

      if (!order) {
        throw new BadRequestException({
          message: 'Không tìm thấy đơn hàng',
          errors: [
            { field: 'id', message: `Không tìm thấy đơn hàng với ID: ${id}` },
          ],
        });
      }

      // Update order fields
      const updatedOrder = this.orderRepository.merge(order, {
        user: updateData.user_id ? { id: updateData.user_id } : undefined,
        payment_method: updateData.payment_method,
        expected_delivery_date: updateData.expected_delivery_date,
        status: updateData.status,
      });

      await this.orderRepository.save(updatedOrder);

      // If order details are provided, update them
      if (updateData.order_details) {
        // Process each order detail
        for (const detail of updateData.order_details) {
          // Check if product detail already exists in order details
          const existingDetail = order.orderDetails?.find(
            (od) => od.productDetail.id === detail.product_detail_id,
          );

          if (existingDetail) {
            existingDetail.quantity += detail.quantity;
            existingDetail.total_price += detail.total_price;
            await this.orderDetailRepository.save(existingDetail);
          } else {
            const newOrderDetail = this.orderDetailRepository.create({
              order: { id },
              productDetail: { id: detail.product_detail_id },
              quantity: detail.quantity,
              total_price: detail.total_price,
            });
            await this.orderDetailRepository.save(newOrderDetail);
          }
        }
      }

      return await this.orderRepository.findOne({
        where: { id },
        relations: ['user', 'orderDetails', 'orderDetails.productDetail'],
      });
    } catch (error) {
      throw new BadRequestException({
        message: 'Lỗi khi cập nhật đơn hàng',
        errors: [{ message: error.message }],
      });
    }
  }

  public async doDeleteOrder(id: number) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['orderDetails'],
      });

      if (!order) {
        throw new BadRequestException({
          message: 'Không tìm thấy đơn hàng',
          errors: [
            { field: 'id', message: `Không tìm thấy đơn hàng với ID: ${id}` },
          ],
        });
      }

      // Remove order details first (though cascade should handle this)
      await this.orderDetailRepository.remove(order.orderDetails);

      // Then remove the order
      await this.orderRepository.remove(order);

      return { message: 'Xóa đơn hàng thành công' };
    } catch (error) {
      throw new BadRequestException({
        message: 'Lỗi khi xóa đơn hàng',
        errors: [{ message: error.message }],
      });
    }
  }
}
