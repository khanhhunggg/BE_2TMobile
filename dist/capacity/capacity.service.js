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
exports.CapacityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const capacity_entity_1 = require("../entity/capacity.entity");
const capacity_price_entity_1 = require("../entity/capacity-price.entity");
let CapacityService = class CapacityService {
    constructor(capacityRepository, capacityPriceRepository) {
        this.capacityRepository = capacityRepository;
        this.capacityPriceRepository = capacityPriceRepository;
    }
    async getAllCapacities(data) {
        const query = this.capacityRepository
            .createQueryBuilder('capacity')
            .select([
            'capacity.id',
            'capacity.value',
            'capacity.unit',
            'capacity.display_name',
        ]);
        if (data.value) {
            query.andWhere('capacity.value = :value', { value: data.value });
        }
        if (data.unit) {
            query.andWhere('capacity.unit = :unit', { unit: data.unit });
        }
        if (data.display_name) {
            query.andWhere('capacity.display_name LIKE :display_name', {
                display_name: `%${data.display_name}%`,
            });
        }
        query.orderBy('capacity.created_at', 'DESC');
        const capacities = await query.getMany();
        return capacities.map((capacity) => ({
            id: capacity.id,
            value: capacity.value,
            unit: capacity.unit,
            display_name: capacity.display_name,
        }));
    }
    async getCapacityById(id) {
        const query = this.capacityRepository
            .createQueryBuilder('capacity')
            .select([
            'capacity.id',
            'capacity.value',
            'capacity.unit',
            'capacity.display_name',
        ])
            .where('capacity.id = :id', { id: id.id });
        const capacity = await query.getOne();
        if (!capacity) {
            throw new Error('Capacity not found');
        }
        return {
            id: capacity.id,
            value: capacity.value,
            unit: capacity.unit,
            display_name: capacity.display_name,
        };
    }
    async updateCapacityPrice(capacityId, data) {
        const capacity = await this.capacityRepository.findOne({
            where: { id: capacityId },
            relations: ['price'],
        });
        if (!capacity) {
            throw new common_1.BadRequestException({
                message: 'Dung lượng không tồn tại',
                errors: [
                    {
                        field: 'capacity_id',
                        message: `Không tìm thấy dung lượng với ID: ${capacityId}`,
                    },
                ],
            });
        }
        if (!capacity.price) {
            const newCapacityPrice = this.capacityPriceRepository.create({
                capacity_id: capacityId,
                price: data.price,
                discount_price: data.discount_price,
            });
            await this.capacityPriceRepository.save(newCapacityPrice);
            return newCapacityPrice;
        }
        await this.capacityPriceRepository.update(capacity.price.id, {
            price: data.price,
            discount_price: data.discount_price,
        });
        return await this.capacityPriceRepository.findOne({
            where: { id: capacity.price.id },
        });
    }
};
exports.CapacityService = CapacityService;
exports.CapacityService = CapacityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(capacity_entity_1.Capacity)),
    __param(1, (0, typeorm_1.InjectRepository)(capacity_price_entity_1.CapacityPrice)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CapacityService);
//# sourceMappingURL=capacity.service.js.map