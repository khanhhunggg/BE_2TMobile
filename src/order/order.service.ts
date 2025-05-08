import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../entity/order.entity';
import { OrderDetail } from '../entity/order-detail.entity';
import { CreateOrderDto } from '../dto/order.dto';
import { User } from '../entity/user.entity';

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
      const total_price = orderData.order_details.reduce((total, detail) => {
        return total + detail.quantity * detail.price;
      }, 0);

      const newOrder = this.orderRepository.create({
        user: { id: orderData.user_id },
        payment_method: orderData.payment_method,
        expected_delivery_date: orderData.expected_delivery_date,
        status: orderData.status || OrderStatus.PENDING,
        total_price: total_price,
      });
      const order = await this.orderRepository.save(newOrder);

      for (const detail of orderData.order_details) {
        const newOrderDetail = this.orderDetailRepository.create({
          order: { id: order.id },
          productDetail: { id: detail.product_detail_id },
          quantity: detail.quantity,
          price: detail.price,
        });
        await this.orderDetailRepository.save(newOrderDetail);
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

      const orderUpdateData: Partial<Order> = {};

      // Only update fields that have changed
      if (
        updateData.user_id !== undefined &&
        updateData.user_id !== order.user?.id
      ) {
        orderUpdateData.user = { id: updateData.user_id } as User;
      }
      if (
        updateData.payment_method !== undefined &&
        updateData.payment_method !== order.payment_method
      ) {
        orderUpdateData.payment_method = updateData.payment_method;
      }
      if (
        updateData.expected_delivery_date !== undefined &&
        updateData.expected_delivery_date !== order.expected_delivery_date
      ) {
        orderUpdateData.expected_delivery_date =
          updateData.expected_delivery_date;
      }
      if (
        updateData.status !== undefined &&
        updateData.status !== order.status
      ) {
        orderUpdateData.status = updateData.status;
      }

      // If order details are provided, update them
      if (updateData.order_details) {
        // Update existing order details
        for (const detail of updateData.order_details) {
          const existingDetail = order.orderDetails.find(
            (od) => od.productDetail.id === detail.product_detail_id,
          );

          if (existingDetail) {
            // Update existing detail
            existingDetail.quantity = detail.quantity;
            existingDetail.price = detail.price;
            await this.orderDetailRepository.save(existingDetail);
          } else {
            // Create new detail if it doesn't exist
            const newOrderDetail = this.orderDetailRepository.create({
              order: { id },
              productDetail: { id: detail.product_detail_id },
              quantity: detail.quantity,
              price: detail.price,
            });
            await this.orderDetailRepository.save(newOrderDetail);
          }
        }

        // Add new details that are not in the existing order
        const existingProductDetailIds = order.orderDetails.map(
          (detail) => detail.productDetail.id,
        );
        const newDetails = updateData.order_details.filter(
          (detail) =>
            !existingProductDetailIds.includes(detail.product_detail_id),
        );

        for (const detail of newDetails) {
          const newOrderDetail = this.orderDetailRepository.create({
            order: { id },
            productDetail: { id: detail.product_detail_id },
            quantity: detail.quantity,
            price: detail.price,
          });
          await this.orderDetailRepository.save(newOrderDetail);
        }

        // Recalculate total price from updated order details
        const total_price = updateData.order_details.reduce((total, detail) => {
          return total + detail.quantity * detail.price;
        }, 0);
        orderUpdateData.total_price = total_price;
      }

      // Only perform update if there are actual changes
      if (Object.keys(orderUpdateData).length > 0) {
        await this.orderRepository.update(id, orderUpdateData);
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
      });

      if (!order) {
        throw new BadRequestException({
          message: 'Không tìm thấy đơn hàng',
          errors: [
            { field: 'id', message: `Không tìm thấy đơn hàng với ID: ${id}` },
          ],
        });
      }

      // Remove the order (order details will be removed by cascade)
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
