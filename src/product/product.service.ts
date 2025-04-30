import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDto,
  DeleteProductDto,
  GetProductByIdDto,
  SearchProductDto,
  UpdateProductDto,
} from 'src/dto/product.dto';
import { ProductDetail } from 'src/entity/product-detail.entity';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,
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

      // Validate color_id and capacity_id
      if (product.color_id) {
        const color = await this.productRepository.manager.findOne('Color', {
          where: { id: product.color_id },
        });
        if (!color) {
          throw new BadRequestException({
            message: 'Thông tin sản phẩm không hợp lệ',
            errors: [
              {
                field: 'color_id',
                message: `Không tìm thấy màu sắc với ID: ${product.color_id}`,
              },
            ],
          });
        }
      }

      if (product.capacity_id) {
        const capacity = await this.productRepository.manager.findOne(
          'Capacity',
          {
            where: { id: product.capacity_id },
          },
        );
        if (!capacity) {
          throw new BadRequestException({
            message: 'Thông tin sản phẩm không hợp lệ',
            errors: [
              {
                field: 'capacity_id',
                message: `Không tìm thấy dung lượng với ID: ${product.capacity_id}`,
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

      const savedProduct = await this.productRepository.save(newProduct);
      const newProductDetail = this.productDetailRepository.create({
        product_id: savedProduct.id,
        color_id: product.color_id,
        capacity_id: product.capacity_id,
        stock_quantity: 0,
        serial_number: product.model,
      });

      await this.productDetailRepository.save(newProductDetail);

      return savedProduct;
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

  public async doGetAllProduct(searchParams: SearchProductDto) {
    try {
      const {
        name,
        model,
        provider_id,
        color_id,
        capacity_id,
        status,
        is_featured,
        page = 1,
        size = 10,
        sort_by = 'created_at',
        order = 'DESC',
      } = searchParams;

      const queryBuilder = this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.provider', 'provider')
        .leftJoinAndSelect('product.productDetails', 'productDetails')
        .leftJoinAndSelect('productDetails.color', 'color')
        .leftJoinAndSelect('productDetails.capacity', 'capacity')
        .select([
          'product.id',
          'product.name',
          'product.model',
          'product.description',
          'product.warranty_period',
          'product.release_year',
          'product.is_featured',
          'product.status',
          'product.created_at',
          'product.updated_at',
          'provider.id',
          'provider.name',
          'provider.email',
          'provider.phone',
          'provider.address',
          'provider.logo',
          'productDetails.id',
          'productDetails.stock_quantity',
          'productDetails.serial_number',
          'color.id',
          'color.name',
          'color.color_code',
          'capacity.id',
          'capacity.value',
          'capacity.unit',
          'capacity.display_name',
        ]);

      if (name) {
        queryBuilder.andWhere('product.name LIKE :name', { name: `%${name}%` });
      }

      if (model) {
        queryBuilder.andWhere('product.model LIKE :model', {
          model: `%${model}%`,
        });
      }

      if (provider_id) {
        queryBuilder.andWhere('product.provider_id = :provider_id', {
          provider_id,
        });
      }

      if (color_id) {
        queryBuilder.andWhere('productDetails.color_id = :color_id', {
          color_id,
        });
      }

      if (capacity_id) {
        queryBuilder.andWhere('productDetails.capacity_id = :capacity_id', {
          capacity_id,
        });
      }

      if (status) {
        queryBuilder.andWhere('product.status = :status', { status });
      }

      if (is_featured !== undefined) {
        queryBuilder.andWhere('product.is_featured = :is_featured', {
          is_featured,
        });
      }

      if (sort_by === 'name') {
        queryBuilder.orderBy('product.name', order);
      } else if (sort_by === 'created_at') {
        queryBuilder.orderBy('product.created_at', order);
      } else if (sort_by === 'price') {
        queryBuilder.orderBy('product.price', order);
      }

      const skip = (page - 1) * size;
      queryBuilder.skip(skip).take(size);

      const [products, total] = await queryBuilder.getManyAndCount();

      if (!products || products.length === 0) {
        throw new BadRequestException({
          message: 'Không tìm thấy sản phẩm nào',
        });
      }

      return {
        data: products,
        pagination: {
          total,
          page,
          size,
          total_pages: Math.ceil(total / size),
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi lấy danh sách sản phẩm',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doGetProductById(data: GetProductByIdDto) {
    try {
      if (!data.id) {
        throw new BadRequestException({
          message: 'ID sản phẩm không hợp lệ',
          errors: [
            {
              field: 'id',
              message: 'ID sản phẩm không được để trống',
            },
          ],
        });
      }

      const product = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.provider', 'provider')
        .leftJoinAndSelect('product.productDetails', 'productDetails')
        .leftJoinAndSelect('productDetails.color', 'color')
        .leftJoinAndSelect('productDetails.capacity', 'capacity')
        .select([
          'product.id',
          'product.name',
          'product.model',
          'product.description',
          'product.warranty_period',
          'product.release_year',
          'product.is_featured',
          'product.status',
          'product.created_at',
          'product.updated_at',
          'provider.id',
          'provider.name',
          'provider.email',
          'provider.phone',
          'provider.address',
          'provider.logo',
          'productDetails.id',
          'productDetails.stock_quantity',
          'productDetails.serial_number',
          'color.id',
          'color.name',
          'color.color_code',
          'capacity.id',
          'capacity.value',
          'capacity.unit',
          'capacity.display_name',
        ])
        .where('product.id = :id', { id: data.id })
        .getOne();

      if (!product) {
        throw new BadRequestException({
          message: 'Không tìm thấy sản phẩm',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy sản phẩm với ID: ${data.id}`,
            },
          ],
        });
      }

      return product;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi lấy thông tin sản phẩm',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doUpdateProduct(data: UpdateProductDto) {
    try {
      const existingProduct = await this.productRepository.findOne({
        where: { id: data.id },
        relations: ['productDetails'],
      });

      if (!existingProduct) {
        throw new BadRequestException({
          message: 'Không tìm thấy sản phẩm',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy sản phẩm với ID: ${data.id}`,
            },
          ],
        });
      }

      if (data.provider_id) {
        const provider = await this.productRepository.manager.findOne(
          'Provider',
          {
            where: { id: data.provider_id },
          },
        );
        if (!provider) {
          throw new BadRequestException({
            message: 'Thông tin sản phẩm không hợp lệ',
            errors: [
              {
                field: 'provider_id',
                message: `Không tìm thấy nhà cung cấp với ID: ${data.provider_id}`,
              },
            ],
          });
        }
      }

      if (data.color_id) {
        const color = await this.productRepository.manager.findOne('Color', {
          where: { id: data.color_id },
        });
        if (!color) {
          throw new BadRequestException({
            message: 'Thông tin sản phẩm không hợp lệ',
            errors: [
              {
                field: 'color_id',
                message: `Không tìm thấy màu sắc với ID: ${data.color_id}`,
              },
            ],
          });
        }
      }

      if (data.capacity_id) {
        const capacity = await this.productRepository.manager.findOne(
          'Capacity',
          {
            where: { id: data.capacity_id },
          },
        );
        if (!capacity) {
          throw new BadRequestException({
            message: 'Thông tin sản phẩm không hợp lệ',
            errors: [
              {
                field: 'capacity_id',
                message: `Không tìm thấy dung lượng với ID: ${data.capacity_id}`,
              },
            ],
          });
        }
      }

      if (data.release_year) {
        const currentYear = new Date().getFullYear();
        if (data.release_year > currentYear) {
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

      if (data.warranty_period && data.warranty_period < 0) {
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

      const productUpdateData = {
        name: data.name,
        model: data.model,
        description: data.description,
        warranty_period: data.warranty_period,
        release_year: data.release_year,
        is_featured: data.is_featured,
        status: data.status,
        provider_id: data.provider_id,
      };

      Object.keys(productUpdateData).forEach(
        (key) =>
          productUpdateData[key] === undefined && delete productUpdateData[key],
      );

      await this.productRepository.update(data.id, productUpdateData);

      const productDetailUpdateData = {
        color_id: data.color_id,
        capacity_id: data.capacity_id,
        stock_quantity: data.stock_quantity,
        serial_number: data.serial_number,
      };

      Object.keys(productDetailUpdateData).forEach(
        (key) =>
          productDetailUpdateData[key] === undefined &&
          delete productDetailUpdateData[key],
      );

      if (Object.keys(productDetailUpdateData).length > 0) {
        if (
          existingProduct.productDetails &&
          existingProduct.productDetails.length > 0
        ) {
          await this.productDetailRepository.update(
            existingProduct.productDetails[0].id,
            productDetailUpdateData,
          );
        } else {
          await this.productDetailRepository.save({
            product_id: data.id,
            ...productDetailUpdateData,
          });
        }
      }

      return await this.doGetProductById({ id: data.id });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi cập nhật sản phẩm',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doDeleteProduct(data: DeleteProductDto) {
    try {
      const existingProduct = await this.productRepository.findOne({
        where: { id: data.id },
        relations: ['productDetails'],
      });

      if (!existingProduct) {
        throw new BadRequestException({
          message: 'Không tìm thấy sản phẩm',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy sản phẩm với ID: ${data.id}`,
            },
          ],
        });
      }

      if (
        existingProduct.productDetails &&
        existingProduct.productDetails.length > 0
      ) {
        await this.productDetailRepository.delete(
          existingProduct.productDetails[0].id,
        );
      }

      await this.productRepository.delete(data.id);

      return {
        message: 'Xóa sản phẩm thành công',
        data: {
          id: data.id,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi xóa sản phẩm',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }
}
