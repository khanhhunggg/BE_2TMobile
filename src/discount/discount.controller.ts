import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  AssignDiscountToUserDto,
  CreateDiscountDto,
  DeleteDiscountDto,
  GetDiscountByIdDto,
  SearchDiscountDto,
  UpdateDiscountDto,
} from 'src/dto/discount.dto';

import { DiscountService } from './discount.service';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post('create-discount')
  @ApiOperation({ summary: 'Tạo khuyến mãi' })
  public async CreateDiscount(@Body() discount: CreateDiscountDto) {
    return await this.discountService.doCreateDiscount(discount);
  }

  @Get('get-all-discount')
  @ApiOperation({ summary: 'Lấy tất cả khuyến mãi' })
  public async GetAllDiscount(@Query() searchParams: SearchDiscountDto) {
    return await this.discountService.doGetAllDiscount(searchParams);
  }

  @Get('get-discount-by-id')
  @ApiOperation({ summary: 'Lấy khuyến mãi theo ID' })
  public async GetDiscountById(@Query() data: GetDiscountByIdDto) {
    return await this.discountService.doGetDiscountById(data);
  }

  @Put('update-discount')
  @ApiOperation({ summary: 'Cập nhật khuyến mãi' })
  public async UpdateDiscount(@Body() data: UpdateDiscountDto) {
    return await this.discountService.doUpdateDiscount(data);
  }

  @Delete('delete-discount')
  @ApiOperation({ summary: 'Xóa khuyến mãi' })
  public async DeleteDiscount(@Query() data: DeleteDiscountDto) {
    return await this.discountService.doDeleteDiscount(data);
  }

  @Post('assign-to-user')
  public async assignDiscountToUser(@Body() data: AssignDiscountToUserDto) {
    return await this.discountService.assignDiscountToUser(
      data.discount_id,
      data.user_id,
    );
  }
}
