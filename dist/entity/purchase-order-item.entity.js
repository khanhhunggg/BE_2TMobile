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
exports.PurchaseOrderItem = void 0;
const typeorm_1 = require("typeorm");
const purchase_entity_1 = require("./purchase.entity");
const product_entity_1 = require("./product.entity");
let PurchaseOrderItem = class PurchaseOrderItem {
};
exports.PurchaseOrderItem = PurchaseOrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], PurchaseOrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_order_id', type: 'bigint' }),
    (0, typeorm_1.Index)('fk_po_item_order'),
    __metadata("design:type", Number)
], PurchaseOrderItem.prototype, "purchaseOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'product_id',
        type: 'int',
        nullable: true,
    }),
    (0, typeorm_1.Index)('fk_po_item_product'),
    __metadata("design:type", Number)
], PurchaseOrderItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PurchaseOrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'unit_price',
        type: 'decimal',
        precision: 12,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], PurchaseOrderItem.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'total_price',
        type: 'decimal',
        precision: 14,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], PurchaseOrderItem.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => purchase_entity_1.Purchase, (purchase) => purchase.purchaseOrderItems),
    (0, typeorm_1.JoinColumn)({
        name: 'purchase_order_id',
        foreignKeyConstraintName: 'fk_po_item_order',
    }),
    __metadata("design:type", purchase_entity_1.Purchase)
], PurchaseOrderItem.prototype, "purchase", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({
        name: 'product_id',
        foreignKeyConstraintName: 'fk_po_item_product',
    }),
    __metadata("design:type", product_entity_1.Product)
], PurchaseOrderItem.prototype, "product", void 0);
exports.PurchaseOrderItem = PurchaseOrderItem = __decorate([
    (0, typeorm_1.Entity)('tbl_purchase_order_item')
], PurchaseOrderItem);
//# sourceMappingURL=purchase-order-item.entity.js.map