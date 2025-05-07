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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const image_entity_1 = require("./image.entity");
const product_detail_entity_1 = require("./product-detail.entity");
const specs_entity_1 = require("./specs.entity");
const vendor_entity_1 = require("./vendor.entity");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "warranty_period", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "release_year", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "is_featured", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Active', 'Inactive'],
        default: 'Active',
    }),
    __metadata("design:type", String)
], Product.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "vendor_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_1.Vendor, (vendor) => vendor.products),
    __metadata("design:type", vendor_entity_1.Vendor)
], Product.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_detail_entity_1.ProductDetail, (productDetail) => productDetail.product),
    __metadata("design:type", Array)
], Product.prototype, "productDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => specs_entity_1.Specs, (specs) => specs.product),
    __metadata("design:type", Array)
], Product.prototype, "specs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Image, (image) => image.product),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('tbl_products')
], Product);
//# sourceMappingURL=product.entity.js.map