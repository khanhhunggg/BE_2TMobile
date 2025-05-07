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
exports.PurchaseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payment_dto_1 = require("../dto/payment.dto");
const purchase_service_1 = require("./purchase.service");
let PurchaseController = class PurchaseController {
    constructor(purchaseService) {
        this.purchaseService = purchaseService;
    }
    async CreatePayment(data) {
        return await this.purchaseService.doCreatePayment(data);
    }
    async GetAllPayment(searchParams) {
        return await this.purchaseService.doGetAllPayment(searchParams);
    }
    async GetPaymentById(data) {
        return await this.purchaseService.doGetPaymentById(data);
    }
    async UpdatePayment(data) {
        return await this.purchaseService.doUpdatePayment(data);
    }
    async DeletePayment(data) {
        return await this.purchaseService.doDeletePayment(data);
    }
};
exports.PurchaseController = PurchaseController;
__decorate([
    (0, common_1.Post)('create-payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo thanh toán' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.CreatePaymentLinkDto]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "CreatePayment", null);
__decorate([
    (0, common_1.Get)('get-all-payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả thanh toán' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.SearchPaymentDto]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "GetAllPayment", null);
__decorate([
    (0, common_1.Get)('get-payment-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thanh toán theo ID' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.GetPaymentByIdDto]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "GetPaymentById", null);
__decorate([
    (0, common_1.Put)('update-payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thanh toán' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "UpdatePayment", null);
__decorate([
    (0, common_1.Delete)('delete-payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa thanh toán' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.DeletePaymentDto]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "DeletePayment", null);
exports.PurchaseController = PurchaseController = __decorate([
    (0, swagger_1.ApiTags)('Thanh toán lưu payment'),
    (0, common_1.Controller)('purchase'),
    __metadata("design:paramtypes", [purchase_service_1.PurchaseService])
], PurchaseController);
//# sourceMappingURL=purchase.controller.js.map