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
exports.Return = exports.ReturnType = void 0;
const typeorm_1 = require("typeorm");
const order_detail_entity_1 = require("./order-detail.entity");
const purchase_order_item_entity_1 = require("./purchase-order-item.entity");
const return_detail_entity_1 = require("./return-detail.entity");
var ReturnType;
(function (ReturnType) {
    ReturnType["REFUND"] = "Refund";
    ReturnType["REPAIR"] = "Repair";
    ReturnType["REPLACEMENT"] = "Replacement";
})(ReturnType || (exports.ReturnType = ReturnType = {}));
let Return = class Return {
};
exports.Return = Return;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Return.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_detail_id' }),
    __metadata("design:type", Number)
], Return.prototype, "orderDetailId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_detail_id' }),
    __metadata("design:type", Number)
], Return.prototype, "purchaseDetailId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'admin_id', nullable: true }),
    __metadata("design:type", Number)
], Return.prototype, "adminId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    __metadata("design:type", Number)
], Return.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'return_code', length: 20, nullable: true, unique: true }),
    __metadata("design:type", String)
], Return.prototype, "returnCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReturnType,
        default: ReturnType.REFUND,
    }),
    __metadata("design:type", String)
], Return.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'refund_amount',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Return.prototype, "refundAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reason_id', nullable: true }),
    __metadata("design:type", Number)
], Return.prototype, "reasonId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Return.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Return.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_detail_entity_1.OrderDetail),
    (0, typeorm_1.JoinColumn)({ name: 'order_detail_id' }),
    __metadata("design:type", order_detail_entity_1.OrderDetail)
], Return.prototype, "orderDetail", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => purchase_order_item_entity_1.PurchaseOrderItem),
    (0, typeorm_1.JoinColumn)({ name: 'purchase_detail_id' }),
    __metadata("design:type", purchase_order_item_entity_1.PurchaseOrderItem)
], Return.prototype, "purchaseDetail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => return_detail_entity_1.ReturnDetail, (returnDetail) => returnDetail.return),
    __metadata("design:type", Array)
], Return.prototype, "returnDetails", void 0);
exports.Return = Return = __decorate([
    (0, typeorm_1.Entity)('tbl_returns')
], Return);
//# sourceMappingURL=return.entity.js.map