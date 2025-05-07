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
exports.CartResponseDto = exports.CartItemResponseDto = exports.UpdateCartDetailDto = exports.DeleteCartItemDto = exports.UpdateCartItemDto = exports.GetCartByUserDto = exports.CartItemDto = exports.CreateCartItemDto = exports.CreateCartDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCartDto {
}
exports.CreateCartDto = CreateCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the user', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCartDto.prototype, "user_id", void 0);
class CreateCartItemDto {
}
exports.CreateCartItemDto = CreateCartItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the user', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCartItemDto.prototype, "user_id", void 0);
class CartItemDto {
}
exports.CartItemDto = CartItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the user', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartItemDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the product detail', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartItemDto.prototype, "product_detail_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantity of the product', example: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Price of the product',
        example: '100000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CartItemDto.prototype, "price", void 0);
class GetCartByUserDto {
}
exports.GetCartByUserDto = GetCartByUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the user', example: 1, required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetCartByUserDto.prototype, "user_id", void 0);
class UpdateCartItemDto {
}
exports.UpdateCartItemDto = UpdateCartItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the cart', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCartItemDto.prototype, "cart_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the cart item', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCartItemDto.prototype, "item_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'New quantity of the product',
        example: 3,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCartItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'New price of the product',
        example: '120000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCartItemDto.prototype, "price", void 0);
class DeleteCartItemDto {
}
exports.DeleteCartItemDto = DeleteCartItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the cart', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteCartItemDto.prototype, "cart_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the cart item', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteCartItemDto.prototype, "item_id", void 0);
class UpdateCartDetailDto {
}
exports.UpdateCartDetailDto = UpdateCartDetailDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'New quantity of the product',
        example: 3,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCartDetailDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'New price of the product',
        example: '120000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCartDetailDto.prototype, "price", void 0);
class CartItemResponseDto {
}
exports.CartItemResponseDto = CartItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the cart item', example: 1 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the cart', example: 1 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "cart_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the product detail', example: 1 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "product_detail_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantity of the product', example: 2 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price of the product', example: '100000' }),
    __metadata("design:type", String)
], CartItemResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp' }),
    __metadata("design:type", Date)
], CartItemResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Product details',
        example: {
            id: 1,
            name: 'Product Name',
            model: 'Model XYZ',
            description: 'Product description',
            warranty_period: 12,
            release_year: 2023,
            is_featured: true,
            status: 'active',
            provider_id: 1,
        },
    }),
    __metadata("design:type", Object)
], CartItemResponseDto.prototype, "product", void 0);
class CartResponseDto {
}
exports.CartResponseDto = CartResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the cart', example: 1 }),
    __metadata("design:type", Number)
], CartResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the user', example: 1 }),
    __metadata("design:type", Number)
], CartResponseDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp' }),
    __metadata("design:type", Date)
], CartResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp' }),
    __metadata("design:type", Date)
], CartResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [CartItemResponseDto],
        description: 'Items in the cart',
    }),
    __metadata("design:type", Array)
], CartResponseDto.prototype, "items", void 0);
//# sourceMappingURL=cart.dto.js.map