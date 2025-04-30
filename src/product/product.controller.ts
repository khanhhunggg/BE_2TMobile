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
  CreateProductDto,
  DeleteProductDto,
  GetProductByIdDto,
  SearchProductDto,
  UpdateProductDto,
} from 'src/dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create-product')
  @ApiOperation({ summary: 'Tạo sản phẩm' })
  public async CreateProduct(@Body() product: CreateProductDto) {
    return await this.productService.doCreateProduct(product);
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
