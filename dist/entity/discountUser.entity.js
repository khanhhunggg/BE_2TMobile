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
exports.DiscountUser = void 0;
const typeorm_1 = require("typeorm");
const discount_entity_1 = require("./discount.entity");
const user_entity_1 = require("./user.entity");
let DiscountUser = class DiscountUser {
};
exports.DiscountUser = DiscountUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DiscountUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount_id', type: 'bigint' }),
    __metadata("design:type", Number)
], DiscountUser.prototype, "discountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'int' }),
    __metadata("design:type", Number)
], DiscountUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'assigned_at' }),
    __metadata("design:type", Date)
], DiscountUser.prototype, "assignedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => discount_entity_1.Discount),
    (0, typeorm_1.JoinColumn)({ name: 'discount_id' }),
    __metadata("design:type", discount_entity_1.Discount)
], DiscountUser.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], DiscountUser.prototype, "user", void 0);
exports.DiscountUser = DiscountUser = __decorate([
    (0, typeorm_1.Entity)('tbl_discount_users')
], DiscountUser);
//# sourceMappingURL=discountUser.entity.js.map