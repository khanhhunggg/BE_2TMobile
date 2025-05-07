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
exports.ReturnService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const return_entity_1 = require("../entity/return.entity");
const return_detail_entity_1 = require("../entity/return-detail.entity");
const order_detail_entity_1 = require("../entity/order-detail.entity");
const purchase_order_item_entity_1 = require("../entity/purchase-order-item.entity");
let ReturnService = class ReturnService {
    constructor(returnRepository, returnDetailRepository, orderDetailRepository, purchaseDetailRepository) {
        this.returnRepository = returnRepository;
        this.returnDetailRepository = returnDetailRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.purchaseDetailRepository = purchaseDetailRepository;
    }
    async create(createReturnDto) {
        if (!createReturnDto.orderDetailId && !createReturnDto.purchaseDetailId) {
            throw new common_1.BadRequestException('Either orderDetailId or purchaseDetailId must be provided');
        }
        if (createReturnDto.orderDetailId) {
            const orderDetail = await this.orderDetailRepository.findOne({
                where: { id: createReturnDto.orderDetailId },
            });
            if (!orderDetail) {
                throw new common_1.BadRequestException(`Order detail with ID ${createReturnDto.orderDetailId} not found`);
            }
        }
        if (createReturnDto.purchaseDetailId) {
            const purchaseDetail = await this.purchaseDetailRepository.findOne({
                where: { id: createReturnDto.purchaseDetailId },
            });
            if (!purchaseDetail) {
                throw new common_1.BadRequestException(`Purchase detail with ID ${createReturnDto.purchaseDetailId} not found`);
            }
        }
        const returnEntity = this.returnRepository.create(createReturnDto);
        return await this.returnRepository.save(returnEntity);
    }
    async findAll(status, type, customerId) {
        const queryBuilder = this.returnRepository
            .createQueryBuilder('return')
            .leftJoinAndSelect('return.returnDetails', 'returnDetails')
            .leftJoinAndSelect('return.orderDetail', 'orderDetail')
            .leftJoinAndSelect('return.purchaseDetail', 'purchaseDetail');
        if (status) {
            queryBuilder.andWhere('returnDetails.status = :status', { status });
        }
        if (type) {
            queryBuilder.andWhere('return.type = :type', { type });
        }
        if (customerId) {
            queryBuilder.andWhere('return.customerId = :customerId', { customerId });
        }
        return await queryBuilder.getMany();
    }
    async findOne(id) {
        const returnEntity = await this.returnRepository.findOne({
            where: { id },
            relations: ['returnDetails', 'orderDetail', 'purchaseDetail'],
        });
        if (!returnEntity) {
            throw new common_1.NotFoundException(`Return with ID ${id} not found`);
        }
        return returnEntity;
    }
    async update(id, updateReturnDto) {
        const returnEntity = await this.findOne(id);
        if (!updateReturnDto.orderDetailId && !updateReturnDto.purchaseDetailId) {
            throw new common_1.BadRequestException('Either orderDetailId or purchaseDetailId must be provided');
        }
        if (updateReturnDto.orderDetailId) {
            const orderDetail = await this.orderDetailRepository.findOne({
                where: { id: updateReturnDto.orderDetailId },
            });
            if (!orderDetail) {
                throw new common_1.BadRequestException(`Order detail with ID ${updateReturnDto.orderDetailId} not found`);
            }
        }
        if (updateReturnDto.purchaseDetailId) {
            const purchaseDetail = await this.purchaseDetailRepository.findOne({
                where: { id: updateReturnDto.purchaseDetailId },
            });
            if (!purchaseDetail) {
                throw new common_1.BadRequestException(`Purchase detail with ID ${updateReturnDto.purchaseDetailId} not found`);
            }
        }
        Object.assign(returnEntity, updateReturnDto);
        return await this.returnRepository.save(returnEntity);
    }
    async remove(id) {
        const returnEntity = await this.findOne(id);
        await this.returnRepository.remove(returnEntity);
    }
    async createReturnDetail(returnId, createReturnDetailDto) {
        const returnEntity = await this.findOne(returnId);
        const returnDetail = this.returnDetailRepository.create({
            ...createReturnDetailDto,
            return: returnEntity,
        });
        return await this.returnDetailRepository.save(returnDetail);
    }
    async updateReturnDetailStatus(returnId, detailId, status) {
        const returnDetail = await this.returnDetailRepository.findOne({
            where: { id: detailId, returnId },
        });
        if (!returnDetail) {
            throw new common_1.NotFoundException(`Return detail with ID ${detailId} not found for return ${returnId}`);
        }
        returnDetail.status = status;
        return await this.returnDetailRepository.save(returnDetail);
    }
    async getReturnDetails(returnId, status) {
        const returnEntity = await this.findOne(returnId);
        if (status) {
            return returnEntity.returnDetails.filter((detail) => detail.status === status);
        }
        return returnEntity.returnDetails;
    }
};
exports.ReturnService = ReturnService;
exports.ReturnService = ReturnService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(return_entity_1.Return)),
    __param(1, (0, typeorm_1.InjectRepository)(return_detail_entity_1.ReturnDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetail)),
    __param(3, (0, typeorm_1.InjectRepository)(purchase_order_item_entity_1.PurchaseOrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReturnService);
//# sourceMappingURL=return.service.js.map