import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDto,
  DeleteProductDto,
  GetProductByIdDto,
  GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto,
  SearchProductDto,
  UpdateProductDto,
} from 'src/dto/product.dto';
import { ProductDetail } from 'src/entity/product-detail.entity';
import { Product } from 'src/entity/product.entity';
import { Specs } from 'src/entity/specs.entity';
import { Repository } from 'typeorm';
import { Image } from '../entity/image.entity';
import { Color } from '../entity/color.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private productDetailRepository: Repository<ProductDetail>,
    @InjectRepository(Specs)
    private specsRepository: Repository<Specs>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}

  public async doCreateProduct(product: CreateProductDto) {
    try {
      if (!product.name) {
        throw new BadRequestException({
          message: 'Tên sản phẩm không được để trống',
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
          message: 'Tên sản phẩm quá dài',
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
          message: 'Model sản phẩm quá dài',
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
            message: 'Năm sản xuất không hợp lệ',
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
          message: 'Thời gian bảo hành không hợp lệ',
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
          message: 'Trạng thái sản phẩm không hợp lệ',
          errors: [
            {
              field: 'status',
              message: 'Trạng thái phải là Active hoặc Inactive',
            },
          ],
        });
      }

      if (product.vendor_id) {
        const vendor = await this.productRepository.manager.findOne('Vendor', {
          where: { id: product.vendor_id },
        });
        if (!vendor) {
          throw new BadRequestException({
            message: 'Nhà cung cấp không tồn tại',
            errors: [
              {
                field: 'vendor_id',
                message: `Không tìm thấy nhà cung cấp với ID: ${product.vendor_id}`,
              },
            ],
          });
        }
      }
      //Lưu ý: Màu sắc chỉ được lưu trong bảng product_detail
      if (product.color_ids && product.color_ids.length > 0) {
        for (const colorId of product.color_ids) {
          const color = await this.colorRepository.findOne({
            where: { id: colorId },
          });
          if (!color) {
            throw new BadRequestException({
              message: 'Màu sắc không tồn tại',
              errors: [
                {
                  field: 'color_ids',
                  message: `Không tìm thấy màu sắc với ID: ${colorId}`,
                },
              ],
            });
          }
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
            message: 'Dung lượng không tồn tại',
            errors: [
              {
                field: 'capacity_id',
                message: `Không tìm thấy dung lượng với ID: ${product.capacity_id}`,
              },
            ],
          });
        }
      }
      //Lưu tbl_product
      const newProduct = this.productRepository.create({
        name: product.name,
        model: product.model,
        description: product.description,
        warranty_period: product.warranty_period,
        release_year: product.release_year,
        is_featured: product.is_featured || false,
        status: product.status || 'Active',
        vendor_id: product.vendor_id,
      });

      const savedProduct = await this.productRepository.save(newProduct);
      let savedProductDetails: ProductDetail[] = [];

      //Lưu tbl_product_detail theo từng màu sắc
      if (product.color_ids && product.color_ids.length > 0) {
        const productDetailPromises = product.color_ids.map(async (colorId) => {
          const newProductDetail = this.productDetailRepository.create({
            product_id: savedProduct.id,
            capacity_id: product.capacity_id,
            color_id: colorId,
            stock_quantity: 0,
            serial_number: product.model,
            import_price: null,
            selling_price: null,
          });
          return this.productDetailRepository.save(newProductDetail);
        });
        savedProductDetails = await Promise.all(productDetailPromises);
      } else {
        //Lưu tbl_product_detail
        const newProductDetail = this.productDetailRepository.create({
          product_id: savedProduct.id,
          capacity_id: product.capacity_id,
          color_id: null,
          stock_quantity: 0,
          serial_number: product.model,
          import_price: null,
          selling_price: null,
        });
        savedProductDetails = [
          await this.productDetailRepository.save(newProductDetail),
        ];
      }

      // Lưu ảnh theo product
      if (product.image_urls && product.image_urls.length > 0) {
        const imagePromises = product.image_urls.map((imageUrl) => {
          if (!imageUrl) {
            throw new BadRequestException({
              message: 'URL ảnh không được để trống',
              errors: [
                {
                  field: 'image_url',
                  message: 'URL ảnh không được để trống',
                },
              ],
            });
          }
          return this.imageRepository.save(
            this.imageRepository.create({
              product: savedProduct,
              imageUrl: imageUrl,
              isThumbnail: false,
              sortOrder: 0,
            }),
          );
        });
        await Promise.all(imagePromises);
      }

      if (product.specs && Object.keys(product.specs).length > 0) {
        const newSpecs = this.specsRepository.create({
          product_id: savedProduct.id,
          screen_size: product.specs.screen_size,
          resolution: product.specs.resolution,
          chipset: product.specs.chipset,
          ram: product.specs.ram,
          os: product.specs.os,
          battery_capacity: product.specs.battery_capacity,
          charging_tech: product.specs.charging_tech,
        });
        await this.specsRepository.save(newSpecs);
      }

      return savedProduct;
    } catch (error) {
      console.log(error);
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

  public async doGetProductDetailIdByProductIdAndColorIdAndCapacityId(
    data: GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto,
  ) {
    if (!data.product_id || !data.color_id || !data.capacity_id) {
      throw new BadRequestException({
        message: 'Missing required fields',
        errors: [
          {
            field: 'product_id, color_id, capacity_id',
            message: 'All fields are required',
          },
        ],
      });
    }
    return await this.productDetailRepository.findOne({
      where: {
        product_id: data.product_id,
        color_id: data.color_id,
        capacity_id: data.capacity_id,
      },
    });
  }

  public async doGetAllProduct(searchParams: SearchProductDto) {
    try {
      const {
        name,
        model,
        vendor_id,
        color_ids,
        capacity_id,
        status,
        is_featured,
        page = 1,
        size = 10,
      } = searchParams;

      const queryBuilder = this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.vendor', 'vendor')
        .leftJoinAndSelect('product.productDetails', 'productDetails')
        .leftJoinAndSelect('productDetails.color', 'color')
        .leftJoinAndSelect('productDetails.capacity', 'capacity')
        .leftJoinAndSelect('capacity.price', 'capacityPrice')
        .leftJoinAndSelect('product.images', 'images')
        .leftJoinAndSelect('product.specs', 'specs')
        .leftJoinAndMapMany(
          'product.productColor',
          'tbl_colors',
          'productColor',
          'productColor.id IN (SELECT pd.color_id FROM tbl_product_details pd WHERE pd.product_id = product.id)',
        )
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
          'vendor.id',
          'vendor.name',
          'vendor.email',
          'vendor.phone',
          'vendor.address',
          'productDetails.id',
          'productDetails.color_id',
          'productDetails.stock_quantity',
          'productDetails.serial_number',
          'productDetails.import_price',
          'productDetails.selling_price',
          'color.id',
          'color.name',
          'color.color_code',
          'capacity.id',
          'capacity.value',
          'capacity.unit',
          'capacity.display_name',
          'capacityPrice.id',
          'capacityPrice.price',
          'capacityPrice.discount_price',
          'images.id',
          'images.imageUrl',
          'images.isThumbnail',
          'images.sortOrder',
          'specs.id',
          'specs.screen_size',
          'specs.resolution',
          'specs.chipset',
          'specs.ram',
          'specs.os',
          'specs.battery_capacity',
          'specs.charging_tech',
          'productColor.id',
          'productColor.name',
          'productColor.color_code',
        ]);

      if (name) {
        queryBuilder.andWhere('product.name LIKE :name', { name: `%${name}%` });
      }

      if (model) {
        queryBuilder.andWhere('product.model LIKE :model', {
          model: `%${model}%`,
        });
      }

      if (vendor_id) {
        queryBuilder.andWhere('product.vendor_id = :vendor_id', {
          vendor_id,
        });
      }

      if (color_ids && color_ids.length > 0) {
        queryBuilder.andWhere('productDetails.color_id IN (:...color_ids)', {
          color_ids,
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
      console.log(error);
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
        .leftJoinAndSelect('product.vendor', 'vendor')
        .leftJoinAndSelect('product.productDetails', 'productDetails')
        .leftJoinAndSelect('productDetails.color', 'color')
        .leftJoinAndSelect('productDetails.capacity', 'capacity')
        .leftJoinAndSelect('capacity.price', 'capacityPrice')
        .leftJoinAndSelect('product.images', 'images')
        .leftJoinAndSelect('product.specs', 'specs')
        .leftJoinAndMapMany(
          'product.productColor',
          'tbl_colors',
          'productColor',
          'productColor.id IN (SELECT pd.color_id FROM tbl_product_details pd WHERE pd.product_id = product.id)',
        )
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
          'vendor.id',
          'vendor.name',
          'vendor.email',
          'vendor.phone',
          'vendor.address',
          'productDetails.id',
          'productDetails.color_id',
          'productDetails.stock_quantity',
          'productDetails.serial_number',
          'productDetails.import_price',
          'productDetails.selling_price',
          'color.id',
          'color.name',
          'color.color_code',
          'capacity.id',
          'capacity.value',
          'capacity.unit',
          'capacity.display_name',
          'capacityPrice.id',
          'capacityPrice.price',
          'capacityPrice.discount_price',
          'images.id',
          'images.imageUrl',
          'images.isThumbnail',
          'images.sortOrder',
          'specs.id',
          'specs.screen_size',
          'specs.resolution',
          'specs.chipset',
          'specs.ram',
          'specs.os',
          'specs.battery_capacity',
          'specs.charging_tech',
          'productColor.id',
          'productColor.name',
          'productColor.color_code',
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
      console.log(error);
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
        relations: ['productDetails', 'specs'],
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

      if (data.vendor_id) {
        const vendor = await this.productRepository.manager.findOne('Vendor', {
          where: { id: data.vendor_id },
        });
        if (!vendor) {
          throw new BadRequestException({
            message: 'Thông tin sản phẩm không hợp lệ',
            errors: [
              {
                field: 'vendor_id',
                message: `Không tìm thấy nhà cung cấp với ID: ${data.vendor_id}`,
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

      const productUpdateData: Partial<Product> = {};

      // Only update fields that have changed
      if (data.name !== undefined && data.name !== existingProduct.name) {
        productUpdateData.name = data.name;
      }
      if (data.model !== undefined && data.model !== existingProduct.model) {
        productUpdateData.model = data.model;
      }
      if (
        data.description !== undefined &&
        data.description !== existingProduct.description
      ) {
        productUpdateData.description = data.description;
      }
      if (
        data.warranty_period !== undefined &&
        data.warranty_period !== existingProduct.warranty_period
      ) {
        productUpdateData.warranty_period = data.warranty_period;
      }
      if (
        data.release_year !== undefined &&
        data.release_year !== existingProduct.release_year
      ) {
        productUpdateData.release_year = data.release_year;
      }
      if (
        data.is_featured !== undefined &&
        data.is_featured !== existingProduct.is_featured
      ) {
        productUpdateData.is_featured = data.is_featured;
      }
      if (data.status !== undefined && data.status !== existingProduct.status) {
        productUpdateData.status = data.status;
      }
      if (
        data.vendor_id !== undefined &&
        data.vendor_id !== existingProduct.vendor_id
      ) {
        productUpdateData.vendor_id = data.vendor_id;
      }

      // Only perform update if there are actual changes
      if (Object.keys(productUpdateData).length > 0) {
        await this.productRepository.update(data.id, productUpdateData);
      }

      // Xử lý product details
      if (data.productDetail && data.productDetail.length > 0) {
        // Xóa tất cả product details cũ
        if (
          existingProduct.productDetails &&
          existingProduct.productDetails.length > 0
        ) {
          await this.productDetailRepository.delete({
            product_id: data.id,
          });
        }

        // Tạo mới product details từ mảng productDetail
        const productDetailPromises = data.productDetail.map(async (detail) => {
          // Validate color_id
          const color = await this.colorRepository.findOne({
            where: { id: detail.color_id },
          });
          if (!color) {
            throw new BadRequestException({
              message: 'Màu sắc không tồn tại',
              errors: [
                {
                  field: 'productDetail.color_id',
                  message: `Không tìm thấy màu sắc với ID: ${detail.color_id}`,
                },
              ],
            });
          }

          // Validate capacity_id
          const capacity = await this.productRepository.manager.findOne(
            'Capacity',
            {
              where: { id: detail.capacity_id },
            },
          );
          if (!capacity) {
            throw new BadRequestException({
              message: 'Dung lượng không tồn tại',
              errors: [
                {
                  field: 'productDetail.capacity_id',
                  message: `Không tìm thấy dung lượng với ID: ${detail.capacity_id}`,
                },
              ],
            });
          }

          // Tìm product detail hiện tại nếu có
          const existingDetail = existingProduct.productDetails?.find(
            (pd) =>
              pd.color_id === detail.color_id &&
              pd.capacity_id === detail.capacity_id,
          );

          const detailUpdateData: Partial<ProductDetail> = {};

          // Chỉ cập nhật các trường có sự thay đổi
          if (
            detail.stock_quantity !== undefined &&
            detail.stock_quantity !== existingDetail?.stock_quantity
          ) {
            detailUpdateData.stock_quantity = detail.stock_quantity;
          }
          if (
            detail.serial_number !== undefined &&
            detail.serial_number !== existingDetail?.serial_number
          ) {
            detailUpdateData.serial_number = detail.serial_number;
          }
          if (
            detail.import_price !== undefined &&
            detail.import_price !== existingDetail?.import_price
          ) {
            detailUpdateData.import_price = detail.import_price;
          }
          if (
            detail.selling_price !== undefined &&
            detail.selling_price !== existingDetail?.selling_price
          ) {
            detailUpdateData.selling_price = detail.selling_price;
          } else if (
            detail.import_price !== undefined &&
            !detail.selling_price
          ) {
            // Nếu có import_price mới và không có selling_price, tính toán selling_price
            const importPrice = parseFloat(detail.import_price);
            detailUpdateData.selling_price = (importPrice * 1.1).toString();
          }

          // Nếu có sự thay đổi hoặc là product detail mới
          if (Object.keys(detailUpdateData).length > 0 || !existingDetail) {
            const newProductDetail = this.productDetailRepository.create({
              product_id: data.id,
              capacity_id: detail.capacity_id,
              color_id: detail.color_id,
              ...detailUpdateData,
              stock_quantity:
                detailUpdateData.stock_quantity ??
                existingDetail?.stock_quantity ??
                0,
              serial_number:
                detailUpdateData.serial_number ??
                existingDetail?.serial_number ??
                data.model,
            });
            return this.productDetailRepository.save(newProductDetail);
          }

          return existingDetail;
        });

        await Promise.all(productDetailPromises);
      }

      if (data.image_urls && data.image_urls.length > 0) {
        await this.imageRepository.delete({
          product: { id: data.id },
        });

        const imagePromises = data.image_urls.map((imageUrl) => {
          if (!imageUrl) {
            throw new BadRequestException({
              message: 'URL ảnh không được để trống',
              errors: [
                {
                  field: 'image_url',
                  message: 'URL ảnh không được để trống',
                },
              ],
            });
          }
          return this.imageRepository.save(
            this.imageRepository.create({
              product: { id: data.id },
              imageUrl: imageUrl,
              isThumbnail: false,
              sortOrder: 0,
            }),
          );
        });

        await Promise.all(imagePromises);
      }

      // Update specs if provided
      if (data.specs) {
        const specsUpdateData: Partial<Specs> = {};

        // Only update specs fields that have changed
        if (
          data.specs.screen_size !== undefined &&
          data.specs.screen_size !== existingProduct.specs?.[0]?.screen_size
        ) {
          specsUpdateData.screen_size = data.specs.screen_size;
        }
        if (
          data.specs.resolution !== undefined &&
          data.specs.resolution !== existingProduct.specs?.[0]?.resolution
        ) {
          specsUpdateData.resolution = data.specs.resolution;
        }
        if (
          data.specs.chipset !== undefined &&
          data.specs.chipset !== existingProduct.specs?.[0]?.chipset
        ) {
          specsUpdateData.chipset = data.specs.chipset;
        }
        if (
          data.specs.ram !== undefined &&
          data.specs.ram !== existingProduct.specs?.[0]?.ram
        ) {
          specsUpdateData.ram = data.specs.ram;
        }
        if (
          data.specs.os !== undefined &&
          data.specs.os !== existingProduct.specs?.[0]?.os
        ) {
          specsUpdateData.os = data.specs.os;
        }
        if (
          data.specs.battery_capacity !== undefined &&
          data.specs.battery_capacity !==
            existingProduct.specs?.[0]?.battery_capacity
        ) {
          specsUpdateData.battery_capacity = data.specs.battery_capacity;
        }
        if (
          data.specs.charging_tech !== undefined &&
          data.specs.charging_tech !== existingProduct.specs?.[0]?.charging_tech
        ) {
          specsUpdateData.charging_tech = data.specs.charging_tech;
        }

        if (Object.keys(specsUpdateData).length > 0) {
          if (existingProduct.specs && existingProduct.specs.length > 0) {
            await this.specsRepository.update(
              existingProduct.specs[0].id,
              specsUpdateData,
            );
          } else {
            await this.specsRepository.save({
              product_id: data.id,
              ...specsUpdateData,
            });
          }
        }
      }

      return await this.doGetProductById({ id: data.id });
    } catch (error) {
      console.log(error);
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
        relations: ['productDetails', 'specs'],
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

      // Delete all images for all product details
      if (
        existingProduct.productDetails &&
        existingProduct.productDetails.length > 0
      ) {
        for (const productDetail of existingProduct.productDetails) {
          await this.imageRepository.delete({
            productId: productDetail.id,
          });
        }
      }

      // Delete product details
      if (
        existingProduct.productDetails &&
        existingProduct.productDetails.length > 0
      ) {
        await this.productDetailRepository.delete({
          product_id: data.id,
        });
      }

      // Delete specs
      if (existingProduct.specs && existingProduct.specs.length > 0) {
        await this.specsRepository.delete(existingProduct.specs[0].id);
      }

      // Delete product
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
