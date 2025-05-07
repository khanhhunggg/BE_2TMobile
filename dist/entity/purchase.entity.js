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
exports.Purchase = void 0;
const typeorm_1 = require("typeorm");
const vendor_entity_1 = require("./vendor.entity");
const purchase_order_item_entity_1 = require("./purchase-order-item.entity");
let Purchase = class Purchase {
};
exports.Purchase = Purchase;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Purchase.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lot_code', length: 100, nullable: true }),
    __metadata("design:type", String)
], Purchase.prototype, "lotCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_type', length: 100, nullable: true }),
    __metadata("design:type", String)
], Purchase.prototype, "itemType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    (0, typeorm_1.Index)('fk_po_vendor'),
    __metadata("design:type", Number)
], Purchase.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_1.Vendor),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id', foreignKeyConstraintName: 'fk_po_vendor' }),
    __metadata("design:type", vendor_entity_1.Vendor)
], Purchase.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_method', length: 50, nullable: true }),
    __metadata("design:type", String)
], Purchase.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Purchase.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_time', type: 'time', nullable: true }),
    __metadata("design:type", String)
], Purchase.prototype, "orderTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'COMPLETED' }),
    __metadata("design:type", String)
], Purchase.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Purchase.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchase_order_item_entity_1.PurchaseOrderItem, (item) => item.purchase),
    __metadata("design:type", Array)
], Purchase.prototype, "purchaseOrderItems", void 0);
exports.Purchase = Purchase = __decorate([
    (0, typeorm_1.Entity)('tbl_purchase')
], Purchase);
//# sourceMappingURL=purchase.entity.js.map