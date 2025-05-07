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
exports.Discount = exports.DiscountType = void 0;
const typeorm_1 = require("typeorm");
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "percentage";
    DiscountType["FIXED_AMOUNT"] = "fixed_amount";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
let Discount = class Discount {
};
exports.Discount = Discount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Discount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false }),
    __metadata("design:type", String)
], Discount.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Discount.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DiscountType,
        nullable: false,
    }),
    __metadata("design:type", String)
], Discount.prototype, "discount_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Discount.prototype, "discount_value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: false }),
    __metadata("design:type", Date)
], Discount.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: false }),
    __metadata("design:type", Date)
], Discount.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Discount.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Discount.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Discount.prototype, "updated_at", void 0);
exports.Discount = Discount = __decorate([
    (0, typeorm_1.Entity)('tbl_discount')
], Discount);
//# sourceMappingURL=discount.entity.js.map