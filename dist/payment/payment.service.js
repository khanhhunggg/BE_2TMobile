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
exports.PaymentService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const crypto = require("crypto");
const rxjs_1 = require("rxjs");
const order_entity_1 = require("../entity/order.entity");
const payment_entity_1 = require("../entity/payment.entity");
const typeorm_2 = require("typeorm");
let PaymentService = class PaymentService {
    constructor(orderRepository, paymentRepository, httpService, configService) {
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
        this.httpService = httpService;
        this.configService = configService;
    }
    async createPaymentLink(createPaymentLinkDto) {
        try {
            const order = await this.orderRepository.findOne({
                where: { id: createPaymentLinkDto.orderId },
                relations: ['orderDetails'],
            });
            if (!order) {
                throw new Error('Order not found');
            }
            const amount = Math.round(order.orderDetails.reduce((sum, detail) => sum + detail.price, 0));
            const clientId = this.configService.get('PAYOS_CLIENT_ID');
            const apiKey = this.configService.get('PAYOS_API_KEY');
            const partnerCode = this.configService.get('PAYOS_PARTNER_CODE');
            const returnUrl = this.configService.get('PAYOS_RETURN_URL');
            const cancelUrl = this.configService.get('PAYOS_CANCEL_URL');
            const orderCode = `ORDER_${order.id}_${Date.now()}`;
            const description = `Thanh toan don hang ${order.id}`;
            const data = {
                orderCode,
                amount,
                description,
                cancelUrl,
                returnUrl,
                expiredAt: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                buyerName: createPaymentLinkDto.buyerName,
                buyerEmail: createPaymentLinkDto.buyerEmail,
                buyerPhone: createPaymentLinkDto.buyerPhone,
                buyerAddress: createPaymentLinkDto.buyerAddress,
            };
            const signature = crypto
                .createHmac('sha256', apiKey)
                .update(JSON.stringify(data))
                .digest('hex');
            const headers = {
                'x-client-id': clientId,
                'x-api-key': apiKey,
                'x-partner-code': partnerCode,
                'Content-Type': 'application/json',
            };
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://api-merchant.payos.vn/v2/payment-requests', {
                ...data,
                signature,
            }, { headers }));
            const payment = this.paymentRepository.create({
                orderId: order.id,
                buyerName: createPaymentLinkDto.buyerName,
                buyerEmail: createPaymentLinkDto.buyerEmail,
                buyerPhone: createPaymentLinkDto.buyerPhone,
                buyerAddress: createPaymentLinkDto.buyerAddress,
                expiredAt: data.expiredAt,
            });
            await this.paymentRepository.save(payment);
            return response.data;
        }
        catch (error) {
            console.error('Error creating payment link:', {
                error: error.response?.data || error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
            });
            throw new common_1.BadRequestException({
                message: 'Lỗi khi tạo link thanh toán',
                errors: [{ message: error.message }],
            });
        }
    }
    async getPaymentRequestInfo(orderId) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['orderDetails'],
        });
        if (!order) {
            throw new Error('Order not found');
        }
        const clientId = this.configService.get('PAYOS_CLIENT_ID');
        const apiKey = this.configService.get('PAYOS_API_KEY');
        const partnerCode = this.configService.get('PAYOS_PARTNER_CODE');
        const headers = {
            'x-client-id': clientId,
            'x-api-key': apiKey,
            'x-partner-code': partnerCode,
            'Content-Type': 'application/json',
        };
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://api-merchant.payos.vn/v2/payment-requests/${orderId}`, { headers }));
            console.log('Payment Request Info:', response.data);
            return response.data;
        }
        catch (error) {
            console.error('Error getting payment request info:', {
                error: error.response?.data || error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
            });
            throw new common_1.BadRequestException({
                message: 'Lỗi khi lấy thông tin thanh toán',
                errors: [{ message: error.message }],
            });
        }
    }
    async doGetAllPayment(searchParams) {
        try {
            const { orderId, buyerName, buyerEmail, page = 1, size = 10, } = searchParams;
            const queryBuilder = this.paymentRepository
                .createQueryBuilder('payment')
                .leftJoinAndSelect('payment.order', 'order');
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
            console.log(error);
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
            const payment = await this.paymentRepository
                .createQueryBuilder('payment')
                .leftJoinAndSelect('payment.order', 'order')
                .where('payment.id = :id', { id: data.id })
                .getOne();
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
            console.log(error);
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
            const paymentUpdateData = {};
            if (data.buyerName !== undefined &&
                data.buyerName !== existingPayment.buyerName) {
                paymentUpdateData.buyerName = data.buyerName;
            }
            if (data.buyerEmail !== undefined &&
                data.buyerEmail !== existingPayment.buyerEmail) {
                paymentUpdateData.buyerEmail = data.buyerEmail;
            }
            if (data.buyerPhone !== undefined &&
                data.buyerPhone !== existingPayment.buyerPhone) {
                paymentUpdateData.buyerPhone = data.buyerPhone;
            }
            if (data.buyerAddress !== undefined &&
                data.buyerAddress !== existingPayment.buyerAddress) {
                paymentUpdateData.buyerAddress = data.buyerAddress;
            }
            if (Object.keys(paymentUpdateData).length > 0) {
                await this.paymentRepository.update(data.id, paymentUpdateData);
            }
            return await this.doGetPaymentById({ id: data.id });
        }
        catch (error) {
            console.log(error);
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
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        axios_1.HttpService,
        config_1.ConfigService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map