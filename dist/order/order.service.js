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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../entity/order.entity");
const order_detail_entity_1 = require("../entity/order-detail.entity");
let OrderService = class OrderService {
    constructor(orderRepository, orderDetailRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
    }
    async doCreateOrder(orderData) {
        try {
            const total_price = orderData.order_details.reduce((total, detail) => {
                return total + detail.quantity * detail.price;
            }, 0);
            const newOrder = this.orderRepository.create({
                user: { id: orderData.user_id },
                payment_method: orderData.payment_method,
                expected_delivery_date: orderData.expected_delivery_date,
                status: orderData.status || order_entity_1.OrderStatus.PENDING,
                total_price: total_price,
            });
            const order = await this.orderRepository.save(newOrder);
            for (const detail of orderData.order_details) {
                const newOrderDetail = this.orderDetailRepository.create({
                    order: { id: order.id },
                    productDetail: { id: detail.product_detail_id },
                    quantity: detail.quantity,
                    price: detail.price,
                });
                await this.orderDetailRepository.save(newOrderDetail);
            }
            return await this.orderRepository.findOne({
                where: { id: order.id },
                relations: ['user', 'orderDetails', 'orderDetails.productDetail'],
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Lỗi khi tạo đơn hàng',
                errors: [{ message: error.message }],
            });
        }
    }
    async doGetAllOrders() {
        try {
            return await this.orderRepository.find({
                relations: ['user', 'orderDetails', 'orderDetails.productDetail'],
            });
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Lỗi khi lấy danh sách đơn hàng',
                errors: [{ message: error.message }],
            });
        }
    }
    async doGetOrderById(id) {
        try {
            const order = await this.orderRepository.findOne({
                where: { id },
                relations: ['user', 'orderDetails', 'orderDetails.productDetail'],
            });
            if (!order) {
                throw new common_1.BadRequestException({
                    message: 'Không tìm thấy đơn hàng',
                    errors: [
                        { field: 'id', message: `Không tìm thấy đơn hàng với ID: ${id}` },
                    ],
                });
            }
            return order;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Lỗi khi lấy thông tin đơn hàng',
                errors: [{ message: error.message }],
            });
        }
    }
    async doUpdateOrder(id, updateData) {
        try {
            const order = await this.orderRepository.findOne({
                where: { id },
                relations: ['orderDetails', 'orderDetails.productDetail'],
            });
            if (!order) {
                throw new common_1.BadRequestException({
                    message: 'Không tìm thấy đơn hàng',
                    errors: [
                        { field: 'id', message: `Không tìm thấy đơn hàng với ID: ${id}` },
                    ],
                });
            }
            const orderUpdateData = {};
            if (updateData.user_id !== undefined &&
                updateData.user_id !== order.user?.id) {
                orderUpdateData.user = { id: updateData.user_id };
            }
            if (updateData.payment_method !== undefined &&
                updateData.payment_method !== order.payment_method) {
                orderUpdateData.payment_method = updateData.payment_method;
            }
            if (updateData.expected_delivery_date !== undefined &&
                updateData.expected_delivery_date !== order.expected_delivery_date) {
                orderUpdateData.expected_delivery_date =
                    updateData.expected_delivery_date;
            }
            if (updateData.status !== undefined &&
                updateData.status !== order.status) {
                orderUpdateData.status = updateData.status;
            }
            if (updateData.order_details) {
                for (const detail of updateData.order_details) {
                    const existingDetail = order.orderDetails.find((od) => od.productDetail.id === detail.product_detail_id);
                    if (existingDetail) {
                        existingDetail.quantity = detail.quantity;
                        existingDetail.price = detail.price;
                        await this.orderDetailRepository.save(existingDetail);
                    }
                    else {
                        const newOrderDetail = this.orderDetailRepository.create({
                            order: { id },
                            productDetail: { id: detail.product_detail_id },
                            quantity: detail.quantity,
                            price: detail.price,
                        });
                        await this.orderDetailRepository.save(newOrderDetail);
                    }
                }
                const existingProductDetailIds = order.orderDetails.map((detail) => detail.productDetail.id);
                const newDetails = updateData.order_details.filter((detail) => !existingProductDetailIds.includes(detail.product_detail_id));
                for (const detail of newDetails) {
                    const newOrderDetail = this.orderDetailRepository.create({
                        order: { id },
                        productDetail: { id: detail.product_detail_id },
                        quantity: detail.quantity,
                        price: detail.price,
                    });
                    await this.orderDetailRepository.save(newOrderDetail);
                }
                const total_price = updateData.order_details.reduce((total, detail) => {
                    return total + detail.quantity * detail.price;
                }, 0);
                orderUpdateData.total_price = total_price;
            }
            if (Object.keys(orderUpdateData).length > 0) {
                await this.orderRepository.update(id, orderUpdateData);
            }
            return await this.orderRepository.findOne({
                where: { id },
                relations: ['user', 'orderDetails', 'orderDetails.productDetail'],
            });
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Lỗi khi cập nhật đơn hàng',
                errors: [{ message: error.message }],
            });
        }
    }
    async doDeleteOrder(id) {
        try {
            const order = await this.orderRepository.findOne({
                where: { id },
            });
            if (!order) {
                throw new common_1.BadRequestException({
                    message: 'Không tìm thấy đơn hàng',
                    errors: [
                        { field: 'id', message: `Không tìm thấy đơn hàng với ID: ${id}` },
                    ],
                });
            }
            await this.orderRepository.remove(order);
            return { message: 'Xóa đơn hàng thành công' };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Lỗi khi xóa đơn hàng',
                errors: [{ message: error.message }],
            });
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map