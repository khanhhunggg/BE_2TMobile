import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { ProductDetail } from '../entity/product-detail.entity';
import { Specs } from '../entity/specs.entity';
import { Image } from '../entity/image.entity';
import { Color } from '../entity/color.entity';
import { CapacityPrice } from '../entity/capacity-price.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductDetail,
      Specs,
      Image,
      Color,
      CapacityPrice,
    ]),
    UploadModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
