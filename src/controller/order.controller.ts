import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaginationResponseDto } from 'src/common/common.dto';
import { UserReq } from 'src/common/user.decorator';
import {
  CreateIdDto,
  CreateOrderDto,
  GetAllOrderByStatusIdDto,
  UpdateOrderStatusDto,
} from 'src/database/dto/order/order.dto';
import { JwtAuthGuard } from 'src/database/dto/user/jwt-auth.guard';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { OrderService } from 'src/service/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-order')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create order' })
  public async createOrder(
    @Query() cartFoodId: CreateIdDto,
    @Body() dto: CreateOrderDto,
    @UserReq() userReq: UserJwtDto,
  ) {
    return await this.orderService.createOrder(cartFoodId, dto, userReq);
  }

  @Get('get-all-order')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all order' })
  public async getAllOrderByUserId(
    @UserReq() userReq: UserJwtDto,
    @Query() paginationDto: PaginationResponseDto,
  ) {
    return await this.orderService.getOrderInformation(userReq, paginationDto);
  }

  @Get('get-by-status-id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all order by status id' })
  public async getAllOrderByStatusId(
    @Query() dto: GetAllOrderByStatusIdDto,
    @UserReq() userReq: UserJwtDto,
    @Query() paginationDto: PaginationResponseDto,
  ) {
    return await this.orderService.getAllOrderByStatusId(
      dto,
      userReq,
      paginationDto,
    );
  }

  @Put('update-order-status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update order status' })
  public async updateOrderStatus(
    @Body() dto: UpdateOrderStatusDto,
    @UserReq() userReq: UserJwtDto,
  ) {
    return await this.orderService.updateOrderStatusUser(dto, userReq);
  }

  @Put('update-order-status-admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update order status admin' })
  public async updateOrderStatusAdmin(
    @Body() dto: UpdateOrderStatusDto,
    @UserReq() userReq: UserJwtDto,
  ) {
    return await this.orderService.updateOrderStatusAdmin(dto, userReq);
  }
}
