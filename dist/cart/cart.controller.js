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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_dto_1 = require("../dto/cart.dto");
const cart_service_1 = require("./cart.service");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async GetCartByUser(data) {
        return await this.cartService.getCartByUserId(data);
    }
    async AddItemToCart(data) {
        return await this.cartService.addItemToCart(data);
    }
    async UpdateCartItem(data) {
        return await this.cartService.updateCartItem(data);
    }
    async DeleteCartItem(data) {
        return await this.cartService.removeItemFromCart(data.cart_id, data.item_id);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)('get-cart-by-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy giỏ hàng theo user' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.GetCartByUserDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "GetCartByUser", null);
__decorate([
    (0, common_1.Post)('add-item-to-cart'),
    (0, swagger_1.ApiOperation)({ summary: 'Thêm sản phẩm vào giỏ hàng' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.CartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "AddItemToCart", null);
__decorate([
    (0, common_1.Put)('update-cart-item'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật sản phẩm trong giỏ hàng' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "UpdateCartItem", null);
__decorate([
    (0, common_1.Delete)('delete-cart-item'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa sản phẩm khỏi giỏ hàng' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.DeleteCartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "DeleteCartItem", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    (0, swagger_1.ApiTags)('Giỏ hàng'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map