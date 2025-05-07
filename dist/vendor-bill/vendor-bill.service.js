"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorBillService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const purchase_entity_1 = require("../entity/purchase.entity");
const purchase_order_item_entity_1 = require("../entity/purchase-order-item.entity");
const typeorm_2 = require("typeorm");
const product_detail_entity_1 = require("../entity/product-detail.entity");
let VendorBillService = class VendorBillService {
    constructor(purchaseRepository, purchaseOrderItemRepository, productDetailRepository) {
        this.purchaseRepository = purchaseRepository;
        this.purchaseOrderItemRepository = purchaseOrderItemRepository;
        this.productDetailRepository = productDetailRepository;
    }
    async doCreateVendorBill(data) {
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
                        await this.productDetailRepository.update({ id: productDetail.id }, {
                            import_price: importPrice,
                            selling_price: sellingPrice,
                        });
                    }
                }
            }
            return savedPurchase;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Lỗi khi tạo hóa đơn',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async doGetAllVendorBill(searchParams) {
        try {
            const { lotCode, itemType, vendorId, status, page = 1, size = 10, } = searchParams;
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
                throw new common_1.BadRequestException({
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
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Lỗi khi lấy danh sách hóa đơn',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async doGetVendorBillById(data) {
        try {
            if (!data.id) {
                throw new common_1.BadRequestException({
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
                throw new common_1.BadRequestException({
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
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Lỗi khi lấy thông tin hóa đơn',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async doUpdateVendorBill(data) {
        try {
            const existingVendorBill = await this.purchaseRepository.findOne({
                where: { id: data.id },
                relations: ['purchaseOrderItems'],
            });
            if (!existingVendorBill) {
                throw new common_1.BadRequestException({
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
            if (existingVendorBill.purchaseOrderItems &&
                existingVendorBill.purchaseOrderItems.length > 0) {
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
                            await this.productDetailRepository.update({ id: productDetail.id }, {
                                import_price: importPrice,
                                selling_price: sellingPrice,
                            });
                        }
                    }
                }
            }
            return await this.doGetVendorBillById({ id: data.id });
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Lỗi khi cập nhật hóa đơn',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async doDeleteVendorBill(data) {
        try {
            const existingVendorBill = await this.purchaseRepository.findOne({
                where: { id: data.id },
                relations: ['items'],
            });
            if (!existingVendorBill) {
                throw new common_1.BadRequestException({
                    message: 'Không tìm thấy hóa đơn',
                    errors: [
                        {
                            field: 'id',
                            message: `Không tìm thấy hóa đơn với ID: ${data.id}`,
                        },
                    ],
                });
            }
            if (existingVendorBill.purchaseOrderItems &&
                existingVendorBill.purchaseOrderItems.length > 0) {
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
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException({
                message: 'Lỗi khi xóa hóa đơn',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
};
exports.VendorBillService = VendorBillService;
exports.VendorBillService = VendorBillService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purchase_entity_1.Purchase)),
    __param(1, (0, typeorm_1.InjectRepository)(purchase_order_item_entity_1.PurchaseOrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_detail_entity_1.ProductDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VendorBillService);
//# sourceMappingURL=vendor-bill.service.js.map