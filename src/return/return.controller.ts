import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ReturnService } from './return.service';
import {
  CreateReturnDto,
  UpdateReturnDto,
  CreateReturnDetailDto,
} from '../dto/return.dto';
import { ReturnStatus } from '../entity/return-detail.entity';
import { Return } from '../entity/return.entity';
import { ReturnDetail } from '../entity/return-detail.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Trả hàng')
@Controller('returns')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới đơn trả hàng' })
  @ApiBody({ type: CreateReturnDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Đơn trả hàng đã được tạo thành công',
    type: Return,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dữ liệu nhập không hợp lệ',
  })
  public async create(
    @Body() createReturnDto: CreateReturnDto,
  ): Promise<Return> {
    return await this.returnService.create(createReturnDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy danh sách tất cả đơn trả hàng' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách tất cả đơn trả hàng',
    type: [Return],
  })
  public async findAll(): Promise<Return[]> {
    return await this.returnService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy đơn trả hàng theo id' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID đơn trả hàng' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Đơn trả hàng đã được tìm thấy',
    type: Return,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Đơn trả hàng không được tìm thấy',
  })
  public async findOne(@Param('id', ParseIntPipe) id: number): Promise<Return> {
    return await this.returnService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật đơn trả hàng' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID đơn trả hàng' })
  @ApiBody({ type: UpdateReturnDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Đơn trả hàng đã được cập nhật thành công',
    type: Return,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Đơn trả hàng không được tìm thấy',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dữ liệu nhập không hợp lệ',
  })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReturnDto: UpdateReturnDto,
  ): Promise<Return> {
    return await this.returnService.update(id, updateReturnDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa đơn trả hàng' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID đơn trả hàng' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Đơn trả hàng đã được xóa thành công',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Đơn trả hàng không được tìm thấy',
  })
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.returnService.remove(id);
  }

  @Post(':id/details')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo chi tiết trả hàng' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID đơn trả hàng' })
  @ApiBody({ type: CreateReturnDetailDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Chi tiết trả hàng đã được tạo thành công',
    type: ReturnDetail,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Đơn trả hàng không được tìm thấy',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dữ liệu nhập không hợp lệ',
  })
  public async createReturnDetail(
    @Param('id', ParseIntPipe) id: number,
    @Body() createReturnDetailDto: CreateReturnDetailDto,
  ): Promise<ReturnDetail> {
    return await this.returnService.createReturnDetail(
      id,
      createReturnDetailDto,
    );
  }

  @Get(':id/details')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy tất cả chi tiết cho đơn trả hàng' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID đơn trả hàng' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách chi tiết trả hàng',
    type: [ReturnDetail],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Đơn trả hàng không được tìm thấy',
  })
  public async getReturnDetails(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnDetail[]> {
    return await this.returnService.getReturnDetails(id);
  }

  @Patch(':id/details/:detailId/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật trạng thái chi tiết trả hàng' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID đơn trả hàng' })
  @ApiParam({
    name: 'detailId',
    type: 'number',
    description: 'ID chi tiết trả hàng',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: Object.values(ReturnStatus) },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Trạng thái chi tiết trả hàng đã được cập nhật thành công',
    type: ReturnDetail,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Đơn trả hàng hoặc chi tiết trả hàng không được tìm thấy',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Giá trị trạng thái không hợp lệ',
  })
  public async updateReturnDetailStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('detailId', ParseIntPipe) detailId: number,
    @Body('status') status: ReturnStatus,
  ): Promise<ReturnDetail> {
    return await this.returnService.updateReturnDetailStatus(
      id,
      detailId,
      status,
    );
  }
}
