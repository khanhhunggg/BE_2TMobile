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
exports.PurchaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payment_entity_1 = require("../entity/payment.entity");
const typeorm_2 = require("typeorm");
let PurchaseService = class PurchaseService {
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async doCreatePayment(data) {
        try {
            if (!data.orderId) {
                throw new common_1.BadRequestException({
                    message: 'Thông tin thanh toán không hợp lệ',
                    errors: [
                        {
                            field: 'orderId',
                            message: 'Mã đơn hàng không được để trống',
                        },
                    ],
                });
            }
            if (!data.buyerName) {
                throw new common_1.BadRequestException({
                    message: 'Thông tin thanh toán không hợp lệ',
                    errors: [
                        {
                            field: 'buyerName',
                            message: 'Tên người mua không được để trống',
                        },
                    ],
                });
            }
            if (!data.buyerEmail) {
                throw new common_1.BadRequestException({
                    message: 'Thông tin thanh toán không hợp lệ',
                    errors: [
                        {
                            field: 'buyerEmail',
                            message: 'Email người mua không được để trống',
                        },
                    ],
                });
            }
            if (!data.buyerPhone) {
                throw new common_1.BadRequestException({
                    message: 'Thông tin thanh toán không hợp lệ',
                    errors: [
                        {
                            field: 'buyerPhone',
                            message: 'Số điện thoại người mua không được để trống',
                        },
                    ],
                });
            }
            if (!data.buyerAddress) {
                throw new common_1.BadRequestException({
                    message: 'Thông tin thanh toán không hợp lệ',
                    errors: [
                        {
                            field: 'buyerAddress',
                            message: 'Địa chỉ người mua không được để trống',
                        },
                    ],
                });
            }
            const payment = this.paymentRepository.create({
                orderId: data.orderId,
                buyerName: data.buyerName,
                buyerEmail: data.buyerEmail,
                buyerPhone: data.buyerPhone,
                buyerAddress: data.buyerAddress,
            });
            return await this.paymentRepository.save(payment);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException({
                message: 'Lỗi khi tạo thanh toán',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async doGetAllPayment(searchParams) {
        try {
            const { orderId, buyerName, buyerEmail, buyerPhone, page = 1, size = 10, sort_by = 'created_at', order = 'DESC', } = searchParams;
            const queryBuilder = this.paymentRepository
                .createQueryBuilder('payment')
                .select([
                'payment.id',
                'payment.orderId',
                'payment.buyerName',
                'payment.buyerEmail',
                'payment.buyerPhone',
                'payment.buyerAddress',
                'payment.created_at',
                'payment.updated_at',
            ]);
            if (orderId) {
                queryBuilder.andWhere('payment.orderId = :orderId', { orderId });
            }
            if (buyerName) {
                queryBuilder.andWhere('payment.buyerName LIKE :buyerName', {
                    buyerName: `%${buyerName}%`,
                });
            }
            if (buyerEmail) {
                queryBuilder.andWhere('payment.buyerEmail LIKE :buyerEmail', {
                    buyerEmail: `%${buyerEmail}%`,
                });
            }
            if (buyerPhone) {
                queryBuilder.andWhere('payment.buyerPhone LIKE :buyerPhone', {
                    buyerPhone: `%${buyerPhone}%`,
                });
            }
            if (sort_by === 'created_at') {
                queryBuilder.orderBy('payment.created_at', order);
            }
            const skip = (page - 1) * size;
            queryBuilder.skip(skip).take(size);
            const [payments, total] = await queryBuilder.getManyAndCount();
            if (!payments || payments.length === 0) {
                throw new common_1.BadRequestException({
                    message: 'Không tìm thấy thanh toán nào',
                });
            }
            return {
                data: payments,
                pagination: {
                    total,
                    page,
                    size,
                    total_pages: Math.ceil(total / size),
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException({
                message: 'Lỗi khi lấy danh sách thanh toán',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async doGetPaymentById(data) {
        try {
            if (!data.id) {
                throw new common_1.BadRequestException({
                    message: 'ID thanh toán không hợp lệ',
                    errors: [
                        {
                            field: 'id',
                            message: 'ID thanh toán không được để trống',
                        },
                    ],
                });
            }
            const payment = await this.paymentRepository.findOne({
                where: { id: data.id },
            });
            if (!payment) {
                throw new common_1.BadRequestException({
                    message: 'Không tìm thấy thanh toán',
                    errors: [
                        {
                            field: 'id',
                            message: `Không tìm thấy thanh toán với ID: ${data.id}`,
                        },
                    ],
                });
            }
            return payment;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException({
                message: 'Lỗi khi lấy thông tin thanh toán',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async doUpdatePayment(data) {
        try {
            const existingPayment = await this.paymentRepository.findOne({
                where: { id: data.id },
            });
            if (!existingPayment) {
                throw new common_1.BadRequestException({
                    message: 'Không tìm thấy thanh toán',
                    errors: [
                        {
                            field: 'id',
                            message: `Không tìm thấy thanh toán với ID: ${data.id}`,
                        },
                    ],
                });
            }
            const paymentUpdateData = {
                orderId: data.orderId,
                buyerName: data.buyerName,
                buyerEmail: data.buyerEmail,
                buyerPhone: data.buyerPhone,
                buyerAddress: data.buyerAddress,
            };
            Object.keys(paymentUpdateData).forEach((key) => paymentUpdateData[key] === undefined && delete paymentUpdateData[key]);
            await this.paymentRepository.update(data.id, paymentUpdateData);
            return await this.doGetPaymentById({ id: data.id });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException({
                message: 'Lỗi khi cập nhật thanh toán',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
    async doDeletePayment(data) {
        try {
            const existingPayment = await this.paymentRepository.findOne({
                where: { id: data.id },
            });
            if (!existingPayment) {
                throw new common_1.BadRequestException({
                    message: 'Không tìm thấy thanh toán',
                    errors: [
                        {
                            field: 'id',
                            message: `Không tìm thấy thanh toán với ID: ${data.id}`,
                        },
                    ],
                });
            }
            await this.paymentRepository.delete(data.id);
            return {
                message: 'Xóa thanh toán thành công',
                data: {
                    id: data.id,
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException({
                message: 'Lỗi khi xóa thanh toán',
                errors: [
                    {
                        message: error.message,
                    },
                ],
            });
        }
    }
};
exports.PurchaseService = PurchaseService;
exports.PurchaseService = PurchaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PurchaseService);
//# sourceMappingURL=purchase.service.js.map