import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Purchase } from 'src/entity/purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePurchaseDto } from 'src/dto/purchase.dto';
import { PurchaseOrderItem } from 'src/entity/purchase-order-item.entity';
import { Vendor } from 'src/entity/vendor.entity';

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
}
