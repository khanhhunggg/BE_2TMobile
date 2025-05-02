import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Purchase } from 'src/entity/purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePurchaseDto,
  GetPurchaseByIdDto,
  GetPurchaseListDto,
  UpdatePurchaseDto,
} from 'src/dto/purchase.dto';
import { PurchaseOrderItem } from 'src/entity/purchase-order-item.entity';
import { Vendor } from 'src/entity/vendor.entity';
import { PaginationResponseDto } from 'src/common/common.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(PurchaseOrderItem)
    private readonly purchaseOrderItemRepository: Repository<PurchaseOrderItem>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  public async createPurchase(createPurchaseDto: CreatePurchaseDto) {
    const vendor = await this.vendorRepository.findOne({
      where: { id: createPurchaseDto.VendorId },
    });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    const purchase = this.purchaseRepository.create({
      lotCode: createPurchaseDto.LotCode,
      itemType: createPurchaseDto.ItemType,
      vendorId: createPurchaseDto.VendorId,
      paymentMethod: createPurchaseDto.PaymentMethod,
      orderDate: createPurchaseDto.OrderDate,
      orderTime: createPurchaseDto.OrderTime,
      status: createPurchaseDto.Status || 'COMPLETED',
      note: createPurchaseDto.Note,
    });

    const savedPurchase = await this.purchaseRepository.save(purchase);

    const purchaseItems = createPurchaseDto.Items.map((item) => {
      const totalPrice = item.Quantity * item.UnitPrice;
      return this.purchaseOrderItemRepository.create({
        purchaseOrderId: savedPurchase.id,
        productId: item.ProductId,
        quantity: item.Quantity,
        unitPrice: item.UnitPrice,
        totalPrice: totalPrice,
      });
    });

    await this.purchaseOrderItemRepository.save(purchaseItems);

    return {
      ...savedPurchase,
      items: purchaseItems,
    };
  }

  public async getAllPurchase(getPurchaseListDto: GetPurchaseListDto) {
    try {
      const {
        page = 1,
        size = 10,
        search = '',
        status,
        vendorId,
        startDate,
        endDate,
        sortBy = 'orderDate',
        sortDirection = 'DESC',
      } = getPurchaseListDto;

      const queryBuilder = this.purchaseRepository
        .createQueryBuilder('purchase')
        .leftJoinAndSelect('purchase.vendor', 'vendor')
        .leftJoinAndSelect('purchase.items', 'items')
        .leftJoinAndSelect('items.product', 'product')
        .select([
          'purchase.id',
          'purchase.lotCode',
          'purchase.itemType',
          'purchase.vendorId',
          'purchase.paymentMethod',
          'purchase.orderDate',
          'purchase.orderTime',
          'purchase.status',
          'purchase.note',
          'vendor.id',
          'vendor.vendorCode',
          'vendor.name',
          'vendor.phone',
          'vendor.email',
          'vendor.address',
          'items.id',
          'items.quantity',
          'items.unitPrice',
          'items.totalPrice',
          'product.id',
          'product.name',
          'product.model',
          'product.description',
        ]);

      if (search) {
        queryBuilder.where(
          '(purchase.lotCode LIKE :search OR vendor.name LIKE :search OR vendor.vendorCode LIKE :search)',
          { search: `%${search}%` },
        );
      }

      if (status) {
        queryBuilder.andWhere('purchase.status = :status', { status });
      }

      if (vendorId) {
        queryBuilder.andWhere('purchase.vendorId = :vendorId', { vendorId });
      }

      if (startDate && endDate) {
        queryBuilder.andWhere(
          'purchase.orderDate BETWEEN :startDate AND :endDate',
          { startDate, endDate },
        );
      }

      const [purchases, total] = await queryBuilder
        .orderBy(`purchase.${sortBy}`, sortDirection as 'DESC' | 'ASC')
        .skip((page - 1) * size)
        .take(size)
        .getManyAndCount();

      return {
        data: purchases,
        total,
        page,
        size,
        totalPages: Math.ceil(total / size),
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Lỗi khi lấy danh sách đơn hàng');
    }
  }

  public async getPurchaseById(id: GetPurchaseByIdDto) {
    try {
      if (!id.Id) {
        throw new BadRequestException({
          message: 'Thông tin đơn hàng không hợp lệ',
          errors: [
            {
              field: 'Id',
              message: 'ID đơn hàng không được để trống',
            },
          ],
        });
      }

      const purchase = await this.purchaseRepository
        .createQueryBuilder('purchase')
        .leftJoinAndSelect('purchase.vendor', 'vendor')
        .leftJoinAndSelect('purchase.items', 'items')
        .leftJoinAndSelect('items.product', 'product')
        .where('purchase.id = :id', { id: id.Id })
        .getOne();

      if (!purchase) {
        throw new BadRequestException({
          message: 'Không tìm thấy đơn hàng',
          errors: [
            {
              field: 'Id',
              message: `Không tìm thấy đơn hàng với ID: ${id.Id}`,
            },
          ],
        });
      }

      return purchase;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Lỗi khi lấy thông tin đơn hàng');
    }
  }

  public async updatePurchase(updateDto: UpdatePurchaseDto) {
    try {
      if (!updateDto.Id) {
        throw new BadRequestException({
          message: 'Thông tin đơn hàng không hợp lệ',
          errors: [
            {
              field: 'Id',
              message: 'ID đơn hàng không được để trống',
            },
          ],
        });
      }

      const purchase = await this.purchaseRepository.findOne({
        where: { id: updateDto.Id },
        relations: ['items'],
      });

      if (!purchase) {
        throw new BadRequestException({
          message: 'Không tìm thấy đơn hàng',
          errors: [
            {
              field: 'Id',
              message: `Không tìm thấy đơn hàng với ID: ${updateDto.Id}`,
            },
          ],
        });
      }

      if (updateDto.VendorId) {
        const vendor = await this.vendorRepository.findOne({
          where: { id: updateDto.VendorId },
        });
        if (!vendor) {
          throw new BadRequestException({
            message: 'Thông tin đơn hàng không hợp lệ',
            errors: [
              {
                field: 'VendorId',
                message: `Không tìm thấy nhà cung cấp với ID: ${updateDto.VendorId}`,
              },
            ],
          });
        }
      }

      if (
        updateDto.Status &&
        !['COMPLETED', 'PENDING', 'CANCELLED'].includes(updateDto.Status)
      ) {
        throw new BadRequestException({
          message: 'Thông tin đơn hàng không hợp lệ',
          errors: [
            {
              field: 'Status',
              message: 'Trạng thái phải là COMPLETED, PENDING hoặc CANCELLED',
            },
          ],
        });
      }

      const updateData: Partial<Purchase> = {
        lotCode: updateDto.LotCode,
        itemType: updateDto.ItemType,
        vendorId: updateDto.VendorId,
        paymentMethod: updateDto.PaymentMethod,
        orderDate: updateDto.OrderDate
          ? new Date(updateDto.OrderDate)
          : undefined,
        orderTime: updateDto.OrderTime,
        status: updateDto.Status,
        note: updateDto.Note,
      };

      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key],
      );

      // Update purchase
      await this.purchaseRepository.update(updateDto.Id, updateData);

      // Update items if provided
      if (updateDto.Items && updateDto.Items.length > 0) {
        // Delete existing items
        await this.purchaseOrderItemRepository.delete({
          purchaseOrderId: updateDto.Id,
        });

        // Create new items
        const newItems = updateDto.Items.map((item) => {
          const totalPrice = item.Quantity * item.UnitPrice;
          return this.purchaseOrderItemRepository.create({
            purchaseOrderId: updateDto.Id,
            productId: item.ProductId,
            quantity: item.Quantity,
            unitPrice: item.UnitPrice,
            totalPrice: totalPrice,
          });
        });

        await this.purchaseOrderItemRepository.save(newItems);
      }

      // Return updated purchase with relations
      return await this.getPurchaseById({ Id: updateDto.Id });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Lỗi khi cập nhật đơn hàng',
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }

  public async deletePurchase(id: GetPurchaseByIdDto) {
    try {
      if (!id.Id) {
        throw new BadRequestException('ID_REQUIRED');
      }

      const purchase = await this.purchaseRepository.findOne({
        where: { id: id.Id },
        relations: ['items'],
      });

      if (!purchase) {
        throw new NotFoundException(`Purchase with ID ${id.Id} not found`);
      }

      if (purchase.items && purchase.items.length > 0) {
        await this.purchaseOrderItemRepository.delete({
          purchaseOrderId: id.Id,
        });
      }

      await this.purchaseRepository.delete(id.Id);

      return {
        message: 'Purchase deleted successfully',
        id: id.Id,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('ERROR_DELETING_PURCHASE');
    }
  }
}
