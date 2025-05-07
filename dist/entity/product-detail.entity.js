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
exports.ProductDetail = void 0;
const typeorm_1 = require("typeorm");
const capacity_entity_1 = require("./capacity.entity");
const color_entity_1 = require("./color.entity");
const product_entity_1 = require("./product.entity");
const review_entity_1 = require("./review.entity");
let ProductDetail = class ProductDetail {
};
exports.ProductDetail = ProductDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductDetail.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductDetail.prototype, "capacity_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ProductDetail.prototype, "stock_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], ProductDetail.prototype, "serial_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 55, nullable: true }),
    __metadata("design:type", String)
], ProductDetail.prototype, "import_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 55, nullable: true }),
    __metadata("design:type", String)
], ProductDetail.prototype, "selling_price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProductDetail.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProductDetail.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.productDetails, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], ProductDetail.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => capacity_entity_1.Capacity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'capacity_id' }),
    __metadata("design:type", capacity_entity_1.Capacity)
], ProductDetail.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ProductDetail.prototype, "color_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => color_entity_1.Color, (color) => color.productDetails, {
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'color_id' }),
    __metadata("design:type", color_entity_1.Color)
], ProductDetail.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.productDetail),
    __metadata("design:type", Array)
], ProductDetail.prototype, "reviews", void 0);
exports.ProductDetail = ProductDetail = __decorate([
    (0, typeorm_1.Entity)('tbl_product_details')
], ProductDetail);
//# sourceMappingURL=product-detail.entity.js.map