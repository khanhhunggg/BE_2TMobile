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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_dto_1 = require("../dto/product.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async CreateProduct(product) {
        return await this.productService.doCreateProduct(product);
    }
    async GetAllProduct(searchParams) {
        return await this.productService.doGetAllProduct(searchParams);
    }
    async GetProductById(data) {
        return await this.productService.doGetProductById(data);
    }
    async GetProductDetailIdByProductIdAndColorIdAndCapacityId(data) {
        return await this.productService.doGetProductDetailIdByProductIdAndColorIdAndCapacityId(data);
    }
    async UpdateProduct(data) {
        return await this.productService.doUpdateProduct(data);
    }
    async DeleteProduct(data) {
        return await this.productService.doDeleteProduct(data);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)('create-product'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo sản phẩm' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "CreateProduct", null);
__decorate([
    (0, common_1.Get)('get-all-product'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả sản phẩm' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.SearchProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "GetAllProduct", null);
__decorate([
    (0, common_1.Get)('get-product-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy sản phẩm theo ID' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.GetProductByIdDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "GetProductById", null);
__decorate([
    (0, common_1.Get)('get-product-detail-id-by-product-id-and-color-id-and-capacity-id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy ID chi tiết sản phẩm theo ID sản phẩm, màu sắc và dung lượng',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "GetProductDetailIdByProductIdAndColorIdAndCapacityId", null);
__decorate([
    (0, common_1.Put)('update-product'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật sản phẩm' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "UpdateProduct", null);
__decorate([
    (0, common_1.Delete)('delete-product'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa sản phẩm' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.DeleteProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "DeleteProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('Sản phẩm'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map