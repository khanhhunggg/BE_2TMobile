import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import {
  CreateOrderDto,
  SearchOrderDto,
  UpdateOrderDto,
} from '../dto/order.dto';
import { OrderDetail } from '../entity/order-detail.entity';
import { Order, OrderStatus } from '../entity/order.entity';
import { User } from '../entity/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    private productService: ProductService,
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
        let productDetailId = null;
        if (detail.product_detail_id != null) {
          productDetailId = detail.product_detail_id;
        } else {
          productDetailId =
            await this.productService.doGetProductDetailIdByProductIdAndColorIdAndCapacityId(
              {
                product_id: detail.product_id,
                color_id: Number(detail.color_id),
                capacity_id: Number(detail.capacity_id),
              },
            );
        }
        const newOrderDetail = this.orderDetailRepository.create({
          order: { id: order.id },
          productDetail: productDetailId,
          quantity: detail.quantity,
          price: detail.price,
          userName: detail.userName,
          userLocation: detail.userLocation,
          userPhone: detail.userPhone,
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

  public async doGetAllOrders(searchParams: SearchOrderDto) {
    try {
      const {
        user_id,
        status,
        payment_method,
        sort_by = 'order_date',
        sort_order = 'DESC',
        page = 1,
        size = 10,
      } = searchParams;

      const queryBuilder = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .leftJoinAndSelect('order.orderDetails', 'orderDetails')
        .leftJoinAndSelect('orderDetails.productDetail', 'productDetail');

      if (user_id) {
        queryBuilder.andWhere('order.user_id = :user_id', { user_id });
      }
      if (status) {
        queryBuilder.andWhere('order.status = :status', { status });
      }

      if (payment_method) {
        queryBuilder.andWhere('order.payment_method = :payment_method', {
          payment_method,
        });
      }

      const validSortFields = ['order_date', 'total_price', 'status'];
      const sortField = validSortFields.includes(sort_by)
        ? sort_by
        : 'order_date';

      queryBuilder.orderBy(`order.${sortField}`, sort_order);

      const skip = (page - 1) * size;
      queryBuilder.skip(skip).take(size);

      const [orders, total] = await queryBuilder.getManyAndCount();

      if (!orders || orders.length === 0) {
        throw new BadRequestException({
          message: 'Không tìm thấy đơn hàng nào',
        });
      }

      return {
        data: orders,
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
        message: 'Lỗi khi lấy danh sách đơn hàng',
        errors: [{ message: error.message }],
      });
    }
  }

  public async doGetAllOrdersByUserId(userId: number) {
    try {
      const orders = await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .leftJoinAndSelect('order.orderDetails', 'orderDetails')
        .leftJoinAndSelect('orderDetails.productDetail', 'productDetail')
        .leftJoinAndSelect('productDetail.product', 'product')
        .where('user.id = :userId', { userId })
        .getMany();
      return orders;
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

  public async doUpdateOrder(updateData: UpdateOrderDto) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: updateData.id },
        relations: ['orderDetails', 'orderDetails.productDetail'],
      });

      if (!order) {
        throw new BadRequestException({
          message: 'Không tìm thấy đơn hàng',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy đơn hàng với ID: ${updateData.id}`,
            },
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
              order: { id: updateData.id },
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
            order: { id: updateData.id },
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
        await this.orderRepository.update(updateData.id, orderUpdateData);
      }

      return await this.orderRepository.findOne({
        where: { id: updateData.id },
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
