import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateProductDto } from 'src/dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create-product')
  @ApiOperation({ summary: 'Tạo sản phẩm' })
  public async CreateProduct(@Body() product: CreateProductDto) {
    return await this.productService.doCreateProduct(product);
  }
}
