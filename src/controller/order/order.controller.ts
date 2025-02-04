import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaginationResponseDto } from 'src/common/common.dto';
import { UserReq } from 'src/common/user.decorator';
import { CreateIdDto, CreateOrderDto } from 'src/database/dto/order/order.dto';
import { JwtAuthGuard } from 'src/database/dto/user/jwt-auth.guard';
import { UserJwtDto } from 'src/database/dto/user/user.dto';
import { OrderService } from 'src/service/order/order.service';

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
}
