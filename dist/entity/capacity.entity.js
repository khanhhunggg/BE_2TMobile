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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capacity = exports.CapacityUnit = void 0;
const typeorm_1 = require("typeorm");
const capacity_price_entity_1 = require("./capacity-price.entity");
var CapacityUnit;
(function (CapacityUnit) {
    CapacityUnit["MB"] = "MB";
    CapacityUnit["GB"] = "GB";
    CapacityUnit["TB"] = "TB";
})(CapacityUnit || (exports.CapacityUnit = CapacityUnit = {}));
let Capacity = class Capacity {
};
exports.Capacity = Capacity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Capacity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Capacity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CapacityUnit,
        default: CapacityUnit.GB,
    }),
    __metadata("design:type", String)
], Capacity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Capacity.prototype, "display_name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Capacity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Capacity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => capacity_price_entity_1.CapacityPrice, (price) => price.capacity),
    __metadata("design:type", capacity_price_entity_1.CapacityPrice)
], Capacity.prototype, "price", void 0);
exports.Capacity = Capacity = __decorate([
    (0, typeorm_1.Entity)('tbl_capacities')
], Capacity);
//# sourceMappingURL=capacity.entity.js.map