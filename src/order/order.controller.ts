import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Đơn hàng')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo đơn hàng mới' })
  @ApiResponse({ status: 201, description: 'Đơn hàng được tạo thành công' })
  @ApiResponse({ status: 400, description: 'Thông tin đơn hàng không hợp lệ' })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.doCreateOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả đơn hàng' })
  @ApiResponse({ status: 200, description: 'Danh sách đơn hàng' })
  async getAllOrders() {
    return await this.orderService.doGetAllOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin đơn hàng theo ID' })
  @ApiResponse({ status: 200, description: 'Thông tin đơn hàng' })
  @ApiResponse({ status: 400, description: 'Không tìm thấy đơn hàng' })
  async getOrderById(@Param('id') id: string) {
    return await this.orderService.doGetOrderById(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin đơn hàng' })
  @ApiResponse({
    status: 200,
    description: 'Đơn hàng được cập nhật thành công',
  })
  @ApiResponse({ status: 400, description: 'Thông tin cập nhật không hợp lệ' })
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: Partial<CreateOrderDto>,
  ) {
    return await this.orderService.doUpdateOrder(Number(id), updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa đơn hàng' })
  @ApiResponse({ status: 200, description: 'Đơn hàng được xóa thành công' })
  @ApiResponse({ status: 400, description: 'Không tìm thấy đơn hàng' })
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.doDeleteOrder(Number(id));
  }
}
