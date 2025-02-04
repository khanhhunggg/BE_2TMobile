import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserReq } from 'src/common/user.decorator';
import { CreateIdDto, CreateOrderDto } from 'src/database/dto/order/order.dto';
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
}
