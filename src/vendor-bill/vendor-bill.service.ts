import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from 'src/entity/purchase.entity';
import { PurchaseOrderItem } from 'src/entity/purchase-order-item.entity';
import { Repository } from 'typeorm';
import {
  CreateVendorBillDto,
  DeleteVendorBillDto,
  GetVendorBillByIdDto,
  SearchVendorBillDto,
  UpdateVendorBillDto,
} from './vendor-bill.dto';
import { ProductDetail } from '../entity/product-detail.entity';

@Injectable()
export class VendorBillService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(PurchaseOrderItem)
    private purchaseOrderItemRepository: Repository<PurchaseOrderItem>,
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
  ) {}

  public async doCreateVendorBill(data: CreateVendorBillDto) {
    try {
      const { items, ...purchaseData } = data;

      const purchase = this.purchaseRepository.create({
        ...purchaseData,
        status: 'COMPLETED',
      });
      const savedPurchase = await this.purchaseRepository.save(purchase);

      const purchaseItems = items.map((item) => ({
        ...item,
        purchaseOrderId: savedPurchase.id,
      }));

      await this.purchaseOrderItemRepository.save(purchaseItems);

      for (const item of items) {
        if (item.productId && item.unitPrice) {
          const productDetails = await this.productDetailRepository.find({
            where: { product_id: item.productId },
          });

          for (const productDetail of productDetails) {
            const importPrice = item.unitPrice.toString();
            const sellingPrice = (item.unitPrice * 1.1).toString();
            await this.productDetailRepository.update(
              { id: productDetail.id },
              {
                import_price: importPrice,
                selling_price: sellingPrice,
              },
            );
          }
        }
      }
      return savedPurchase;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi tạo hóa đơn',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doGetAllVendorBill(searchParams: SearchVendorBillDto) {
    try {
      const {
        lotCode,
        itemType,
        vendorId,
        status,
        page = 1,
        size = 10,
      } = searchParams;

      const queryBuilder = this.purchaseRepository
        .createQueryBuilder('purchase')
        .leftJoinAndSelect('purchase.purchaseOrderItems', 'items')
        .leftJoinAndSelect('items.product', 'product')
        .leftJoinAndSelect('product.productDetails', 'productDetail')
        .leftJoinAndSelect('productDetail.color', 'color')
        .leftJoinAndSelect('productDetail.capacity', 'capacity');

      if (lotCode) {
        queryBuilder.andWhere('purchase.lotCode LIKE :lotCode', {
          lotCode: `%${lotCode}%`,
        });
      }

      if (itemType) {
        queryBuilder.andWhere('purchase.itemType = :itemType', { itemType });
      }

      if (vendorId) {
        queryBuilder.andWhere('purchase.vendorId = :vendorId', { vendorId });
      }

      if (status) {
        queryBuilder.andWhere('purchase.status = :status', { status });
      }

      const skip = (page - 1) * size;
      queryBuilder.skip(skip).take(size);

      const [vendorBills, total] = await queryBuilder.getManyAndCount();

      if (!vendorBills || vendorBills.length === 0) {
        throw new BadRequestException({
          message: 'Không tìm thấy hóa đơn nào',
        });
      }

      return {
        data: vendorBills,
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
        message: 'Lỗi khi lấy danh sách hóa đơn',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doGetVendorBillById(data: GetVendorBillByIdDto) {
    try {
      if (!data.id) {
        throw new BadRequestException({
          message: 'ID hóa đơn không hợp lệ',
          errors: [
            {
              field: 'id',
              message: 'ID hóa đơn không được để trống',
            },
          ],
        });
      }

      const vendorBill = await this.purchaseRepository
        .createQueryBuilder('purchase')
        .leftJoinAndSelect('purchase.purchaseOrderItems', 'items')
        .leftJoinAndSelect('items.product', 'product')
        .leftJoinAndSelect('product.productDetails', 'productDetail')
        .leftJoinAndSelect('productDetail.color', 'color')
        .leftJoinAndSelect('productDetail.capacity', 'capacity')
        .where('purchase.id = :id', { id: data.id })
        .getOne();

      if (!vendorBill) {
        throw new BadRequestException({
          message: 'Không tìm thấy hóa đơn',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy hóa đơn với ID: ${data.id}`,
            },
          ],
        });
      }

      return vendorBill;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi lấy thông tin hóa đơn',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doUpdateVendorBill(data: UpdateVendorBillDto) {
    try {
      const existingVendorBill = await this.purchaseRepository.findOne({
        where: { id: data.id },
        relations: ['items'],
      });

      if (!existingVendorBill) {
        throw new BadRequestException({
          message: 'Không tìm thấy hóa đơn',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy hóa đơn với ID: ${data.id}`,
            },
          ],
        });
      }

      const { items, ...purchaseData } = data;

      await this.purchaseRepository.update(data.id, purchaseData);
      if (
        existingVendorBill.purchaseOrderItems &&
        existingVendorBill.purchaseOrderItems.length > 0
      ) {
        await this.purchaseOrderItemRepository.delete({
          purchaseOrderId: data.id,
        });
      }
      if (items && items.length > 0) {
        const purchaseItems = items.map((item) => ({
          ...item,
          purchaseOrderId: data.id,
        }));
        await this.purchaseOrderItemRepository.save(purchaseItems);

        for (const item of items) {
          if (item.productId && item.unitPrice) {
            const productDetails = await this.productDetailRepository.find({
              where: { product_id: item.productId },
            });

            for (const productDetail of productDetails) {
              const importPrice = item.unitPrice.toString();
              const sellingPrice = (item.unitPrice * 1.1).toString();
              await this.productDetailRepository.update(
                { id: productDetail.id },
                {
                  import_price: importPrice,
                  selling_price: sellingPrice,
                },
              );
            }
          }
        }
      }

      return await this.doGetVendorBillById({ id: data.id });
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: 'Lỗi khi cập nhật hóa đơn',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async doDeleteVendorBill(data: DeleteVendorBillDto) {
    try {
      const existingVendorBill = await this.purchaseRepository.findOne({
        where: { id: data.id },
        relations: ['items'],
      });

      if (!existingVendorBill) {
        throw new BadRequestException({
          message: 'Không tìm thấy hóa đơn',
          errors: [
            {
              field: 'id',
              message: `Không tìm thấy hóa đơn với ID: ${data.id}`,
            },
          ],
        });
      }

      if (
        existingVendorBill.purchaseOrderItems &&
        existingVendorBill.purchaseOrderItems.length > 0
      ) {
        await this.purchaseOrderItemRepository.delete({
          purchaseOrderId: data.id,
        });
      }

      await this.purchaseRepository.delete(data.id);

      return {
        message: 'Xóa hóa đơn thành công',
        data: {
          id: data.id,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi xóa hóa đơn',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }
}
