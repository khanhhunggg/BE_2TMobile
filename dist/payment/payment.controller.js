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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const swagger_1 = require("@nestjs/swagger");
const payment_dto_1 = require("../dto/payment.dto");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async doCreatePaymentUrl(createPaymentLinkDto) {
        const checkoutUrl = await this.paymentService.createPaymentLink(createPaymentLinkDto);
        return { checkoutUrl };
    }
    async getPaymentInfo(orderId) {
        return this.paymentService.getPaymentRequestInfo(orderId);
    }
    async CreatePaymentLink(data) {
        return await this.paymentService.createPaymentLink(data);
    }
    async GetAllPayment(searchParams) {
        return await this.paymentService.doGetAllPayment(searchParams);
    }
    async GetPaymentById(data) {
        return await this.paymentService.doGetPaymentById(data);
    }
    async UpdatePayment(data) {
        return await this.paymentService.doUpdatePayment(data);
    }
    async DeletePayment(data) {
        return await this.paymentService.doDeletePayment(data);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('create-url'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo phiên thanh toán' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return payment URL' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.CreatePaymentLinkDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "doCreatePaymentUrl", null);
__decorate([
    (0, common_1.Get)('payment-info/:orderId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment request information' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return payment request information',
    }),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentInfo", null);
__decorate([
    (0, common_1.Post)('create-payment-link'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo link thanh toán' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.CreatePaymentLinkDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "CreatePaymentLink", null);
__decorate([
    (0, common_1.Get)('get-all-payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả thanh toán' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.SearchPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "GetAllPayment", null);
__decorate([
    (0, common_1.Get)('get-payment-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thanh toán theo ID' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.GetPaymentByIdDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "GetPaymentById", null);
__decorate([
    (0, common_1.Put)('update-payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thanh toán' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "UpdatePayment", null);
__decorate([
    (0, common_1.Delete)('delete-payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa thanh toán' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.DeletePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "DeletePayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('Thanh toán'),
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map