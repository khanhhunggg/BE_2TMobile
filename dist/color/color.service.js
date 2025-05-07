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
exports.ColorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const color_entity_1 = require("../entity/color.entity");
let ColorService = class ColorService {
    constructor(colorRepository) {
        this.colorRepository = colorRepository;
    }
    async getAllColors(data) {
        const query = this.colorRepository
            .createQueryBuilder('color')
            .select(['color.id', 'color.name', 'color.color_code']);
        if (data.name) {
            query.andWhere('color.name LIKE :name', { name: `%${data.name}%` });
        }
        if (data.color_code) {
            query.andWhere('color.color_code = :color_code', {
                color_code: data.color_code,
            });
        }
        query.orderBy('color.created_at', 'DESC');
        const colors = await query.getMany();
        return colors.map((color) => ({
            id: color.id,
            name: color.name,
            color_code: color.color_code,
        }));
    }
    async getColorById(id) {
        const query = this.colorRepository
            .createQueryBuilder('color')
            .select(['color.id', 'color.name', 'color.color_code'])
            .where('color.id = :id', { id: id.id });
        const color = await query.getOne();
        if (!color) {
            throw new Error('Color not found');
        }
        return {
            id: color.id,
            name: color.name,
            color_code: color.color_code,
        };
    }
};
exports.ColorService = ColorService;
exports.ColorService = ColorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(color_entity_1.Color)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ColorService);
//# sourceMappingURL=color.service.js.map