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
exports.CartDetail = void 0;
const typeorm_1 = require("typeorm");
const cart_entity_1 = require("./cart.entity");
const product_detail_entity_1 = require("./product-detail.entity");
const order_detail_entity_1 = require("./order-detail.entity");
let CartDetail = class CartDetail {
};
exports.CartDetail = CartDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CartDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CartDetail.prototype, "cart_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CartDetail.prototype, "product_detail_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CartDetail.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CartDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cart_entity_1.Cart, (cart) => cart.cartDetails),
    __metadata("design:type", cart_entity_1.Cart)
], CartDetail.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_detail_entity_1.ProductDetail),
    __metadata("design:type", product_detail_entity_1.ProductDetail)
], CartDetail.prototype, "productDetail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_detail_entity_1.OrderDetail, (orderDetail) => orderDetail.cartDetail),
    __metadata("design:type", Array)
], CartDetail.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CartDetail.prototype, "created_at", void 0);
exports.CartDetail = CartDetail = __decorate([
    (0, typeorm_1.Entity)('tbl_cart_details')
], CartDetail);
//# sourceMappingURL=cart-detail.entity.js.map