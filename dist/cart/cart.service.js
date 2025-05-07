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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_detail_entity_1 = require("../entity/cart-detail.entity");
const cart_entity_1 = require("../entity/cart.entity");
const typeorm_2 = require("typeorm");
let CartService = class CartService {
    constructor(cartRepository, cartDetailRepository) {
        this.cartRepository = cartRepository;
        this.cartDetailRepository = cartDetailRepository;
    }
    async createCart(data) {
        try {
            if (!data.user_id) {
                throw new common_1.BadRequestException({
                    message: 'Lỗi khi tạo giỏ hàng',
                    errors: [
                        {
                            message: 'ID người dùng không được để trống',
                        },
                    ],
                });
            }
            const user = await this.cartRepository.manager.findOne('User', {
                where: { id: data.user_id },
            });
            if (!user) {
                throw new common_1.BadRequestException({
                    message: 'Lỗi khi tạo giỏ hàng',
                    errors: [
                        {
                            message: `Không tìm thấy người dùng với ID: ${data.user_id}`,
                        },
                    ],
                });
            }
            const existingCart = await this.cartRepository.findOne({
                where: { user_id: data.user_id },
            });
            if (existingCart) {
                throw new common_1.BadRequestException({
                    message: 'Lỗi khi tạo giỏ hàng',
                    errors: [
                        {
                            message: 'Người dùng đã có giỏ hàng',
                        },
                    ],
                });
            }
            const newCart = this.cartRepository.create({
                user_id: data.user_id,
            });
            return await this.cartRepository.save(newCart);
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Lỗi khi tạo giỏ hàng',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async addItemToCart(data) {
        try {
            if (!data.user_id ||
                !data.product_detail_id ||
                !data.quantity ||
                data.quantity <= 0) {
                throw new common_1.BadRequestException({
                    message: 'Lỗi khi thêm sản phẩm vào giỏ hàng',
                    errors: [
                        {
                            message: 'Vui lòng cung cấp đầy đủ thông tin sản phẩm và số lượng hợp lệ',
                        },
                    ],
                });
            }
            const cart = await this.cartRepository.findOne({
                where: { user_id: data.user_id },
            });
            if (!cart) {
                const newCart = await this.createCart({ user_id: data.user_id });
                const newItem = this.cartDetailRepository.create({
                    cart_id: newCart.id,
                    product_detail_id: data.product_detail_id,
                    quantity: data.quantity,
                    price: data.price,
                });
                return await this.cartDetailRepository.save(newItem);
            }
            const existingItem = await this.cartDetailRepository.findOne({
                where: {
                    cart_id: cart.id,
                    product_detail_id: data.product_detail_id,
                },
            });
            if (existingItem) {
                existingItem.quantity += data.quantity;
                if (existingItem.quantity <= 0) {
                    await this.cartDetailRepository.remove(existingItem);
                    return {
                        message: 'Sản phẩm đã được xóa khỏi giỏ hàng do số lượng bằng 0',
                    };
                }
                return await this.cartDetailRepository.save(existingItem);
            }
            const newItem = this.cartDetailRepository.create({
                cart_id: cart.id,
                product_detail_id: data.product_detail_id,
                quantity: data.quantity,
                price: data.price,
            });
            return await this.cartDetailRepository.save(newItem);
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Lỗi khi thêm sản phẩm vào giỏ hàng',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async updateCartItem(data) {
        try {
            if (!data.item_id ||
                !data.cart_id ||
                !data.quantity ||
                data.quantity <= 0) {
                throw new common_1.BadRequestException({
                    message: 'Lỗi khi cập nhật giỏ hàng',
                    errors: [
                        {
                            message: 'Vui lòng cung cấp đầy đủ thông tin và số lượng hợp lệ',
                        },
                    ],
                });
            }
            const item = await this.cartDetailRepository.findOne({
                where: {
                    id: data.item_id,
                    cart_id: data.cart_id,
                },
            });
            if (!item) {
                throw new common_1.BadRequestException({
                    message: 'Lỗi khi cập nhật giỏ hàng',
                    errors: [
                        {
                            message: `Không tìm thấy sản phẩm với ID: ${data.item_id}`,
                        },
                    ],
                });
            }
            if (data.quantity <= 0) {
                await this.cartDetailRepository.remove(item);
                return {
                    message: 'Sản phẩm đã được xóa khỏi giỏ hàng do số lượng bằng 0',
                };
            }
            const updateData = {};
            if (data.quantity !== undefined && data.quantity !== item.quantity) {
                updateData.quantity = data.quantity;
            }
            if (data.price !== undefined &&
                Number(data.price) > 0 &&
                data.price !== item.price) {
                updateData.price = data.price;
            }
            if (Object.keys(updateData).length > 0) {
                await this.cartDetailRepository.update(data.item_id, updateData);
                return await this.cartDetailRepository.findOne({
                    where: { id: data.item_id },
                });
            }
            return item;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Lỗi khi cập nhật giỏ hàng',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async removeItemFromCart(cartId, itemId) {
        try {
            if (!cartId || !itemId) {
                throw new common_1.BadRequestException({
                    message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng',
                    errors: [
                        {
                            message: 'Vui lòng cung cấp đầy đủ thông tin cart_id và item_id',
                        },
                    ],
                });
            }
            const item = await this.cartDetailRepository.findOne({
                where: {
                    id: itemId,
                    cart_id: cartId,
                },
            });
            if (!item) {
                throw new common_1.BadRequestException({
                    message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng',
                    errors: [
                        {
                            message: `Không tìm thấy sản phẩm với ID: ${itemId}`,
                        },
                    ],
                });
            }
            await this.cartDetailRepository.remove(item);
            return { message: 'Sản phẩm đã được xóa khỏi giỏ hàng thành công' };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async getCartByUserId(data) {
        try {
            if (!data.user_id) {
                throw new common_1.BadRequestException({
                    message: 'Lỗi khi lấy thông tin giỏ hàng',
                    errors: [
                        {
                            message: 'ID người dùng không được để trống',
                        },
                    ],
                });
            }
            const cart = await this.cartRepository.findOne({
                where: { user_id: data.user_id },
                relations: [
                    'cartDetails',
                    'cartDetails.productDetail',
                    'cartDetails.productDetail.product',
                ],
            });
            if (!cart) {
                return { message: 'Giỏ hàng trống', cartDetails: [] };
            }
            return cart;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Lỗi khi lấy thông tin giỏ hàng',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_detail_entity_1.CartDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map