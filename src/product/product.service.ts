import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from 'src/dto/product.dto';
import { validate } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  public async doCreateProduct(product: CreateProductDto) {
    try {
      if (!product.name) {
        throw new BadRequestException({
          message: 'Thông tin sản phẩm không hợp lệ',
          errors: [
            {
              field: 'name',
              message: 'Tên sản phẩm không được để trống',
            },
          ],
        });
      }

      if (product.name && product.name.length > 255) {
        throw new BadRequestException({
          message: 'Thông tin sản phẩm không hợp lệ',
          errors: [
            {
              field: 'name',
              message: 'Tên sản phẩm không được vượt quá 255 ký tự',
            },
          ],
        });
      }

      if (product.model && product.model.length > 100) {
        throw new BadRequestException({
          message: 'Thông tin sản phẩm không hợp lệ',
          errors: [
            {
              field: 'model',
              message: 'Model sản phẩm không được vượt quá 100 ký tự',
            },
          ],
        });
      }

      if (product.release_year) {
        const currentYear = new Date().getFullYear();
        if (product.release_year > currentYear) {
          throw new BadRequestException({
            message: 'Thông tin sản phẩm không hợp lệ',
            errors: [
              {
                field: 'release_year',
                message: 'Năm sản xuất không được lớn hơn năm hiện tại',
              },
            ],
          });
        }
      }

      if (product.warranty_period && product.warranty_period < 0) {
        throw new BadRequestException({
          message: 'Thông tin sản phẩm không hợp lệ',
          errors: [
            {
              field: 'warranty_period',
              message: 'Thời gian bảo hành không được nhỏ hơn 0',
            },
          ],
        });
      }

      if (product.status && !['Active', 'Inactive'].includes(product.status)) {
        throw new BadRequestException({
          message: 'Thông tin sản phẩm không hợp lệ',
          errors: [
            {
              field: 'status',
              message: 'Trạng thái phải là Active hoặc Inactive',
            },
          ],
        });
      }

      if (product.provider_id) {
        const provider = await this.productRepository.manager.findOne(
          'Provider',
          {
            where: { id: product.provider_id },
          },
        );
        if (!provider) {
          throw new BadRequestException({
            message: 'Thông tin sản phẩm không hợp lệ',
            errors: [
              {
                field: 'provider_id',
                message: `Không tìm thấy nhà cung cấp với ID: ${product.provider_id}`,
              },
            ],
          });
        }
      }

      const newProduct = this.productRepository.create({
        name: product.name,
        model: product.model,
        description: product.description,
        warranty_period: product.warranty_period,
        release_year: product.release_year,
        is_featured: product.is_featured || false,
        status: product.status || 'Active',
        provider_id: product.provider_id,
      });

      return await this.productRepository.save(newProduct);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi tạo sản phẩm',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }
}
