import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  public async doCreateProduct(product: Product) {
    try {
      const newProduct = this.productRepository.create(product);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      throw new Error(error);
    }
  }
}
