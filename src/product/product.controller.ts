import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateProductDto,
  DeleteProductDto,
  GetProductByIdDto,
  GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto,
  SearchProductDto,
  UpdateProductDto,
} from 'src/dto/product.dto';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Sản phẩm')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  public async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.doCreateProduct(createProductDto);
  }

  @Get('get-all-product')
  @ApiOperation({ summary: 'Lấy tất cả sản phẩm' })
  public async GetAllProduct(@Query() searchParams: SearchProductDto) {
    return await this.productService.doGetAllProduct(searchParams);
  }

  @Get('get-product-by-id')
  @ApiOperation({ summary: 'Lấy sản phẩm theo ID' })
  public async GetProductById(@Query() data: GetProductByIdDto) {
    return await this.productService.doGetProductById(data);
  }

  @Get('get-product-detail-id-by-product-id-and-color-id-and-capacity-id')
  @ApiOperation({
    summary: 'Lấy ID chi tiết sản phẩm theo ID sản phẩm, màu sắc và dung lượng',
  })
  public async GetProductDetailIdByProductIdAndColorIdAndCapacityId(
    @Query() data: GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto,
  ) {
    return await this.productService.doGetProductDetailIdByProductIdAndColorIdAndCapacityId(
      data,
    );
  }

  @Put('update-product')
  @ApiOperation({ summary: 'Cập nhật sản phẩm' })
  public async UpdateProduct(@Body() data: UpdateProductDto) {
    return await this.productService.doUpdateProduct(data);
  }

  @Delete('delete-product')
  @ApiOperation({ summary: 'Xóa sản phẩm' })
  public async DeleteProduct(@Query() data: DeleteProductDto) {
    return await this.productService.doDeleteProduct(data);
  }
}
