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
exports.DiscountController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const discount_dto_1 = require("../dto/discount.dto");
const discount_service_1 = require("./discount.service");
let DiscountController = class DiscountController {
    constructor(discountService) {
        this.discountService = discountService;
    }
    async CreateDiscount(discount) {
        return await this.discountService.doCreateDiscount(discount);
    }
    async GetAllDiscount(searchParams) {
        return await this.discountService.doGetAllDiscount(searchParams);
    }
    async GetDiscountById(data) {
        return await this.discountService.doGetDiscountById(data);
    }
    async UpdateDiscount(data) {
        return await this.discountService.doUpdateDiscount(data);
    }
    async DeleteDiscount(data) {
        return await this.discountService.doDeleteDiscount(data);
    }
    async assignDiscountToUser(data) {
        return await this.discountService.assignDiscountToUser(data.discount_id, data.user_id);
    }
    async removeDiscountFromUser(data) {
        return await this.discountService.removeDiscountFromUser(data);
    }
};
exports.DiscountController = DiscountController;
__decorate([
    (0, common_1.Post)('create-discount'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo khuyến mãi' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.CreateDiscountDto]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "CreateDiscount", null);
__decorate([
    (0, common_1.Get)('get-all-discount'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả khuyến mãi' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.SearchDiscountDto]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "GetAllDiscount", null);
__decorate([
    (0, common_1.Get)('get-discount-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy khuyến mãi theo ID' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.GetDiscountByIdDto]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "GetDiscountById", null);
__decorate([
    (0, common_1.Put)('update-discount'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật khuyến mãi' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.UpdateDiscountDto]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "UpdateDiscount", null);
__decorate([
    (0, common_1.Delete)('delete-discount'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa khuyến mãi' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.DeleteDiscountDto]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "DeleteDiscount", null);
__decorate([
    (0, common_1.Post)('assign-to-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.AssignDiscountToUserDto]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "assignDiscountToUser", null);
__decorate([
    (0, common_1.Delete)('remove-from-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.RemoveDiscountFromUserDto]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "removeDiscountFromUser", null);
exports.DiscountController = DiscountController = __decorate([
    (0, swagger_1.ApiTags)('Khuyến mãi'),
    (0, common_1.Controller)('discount'),
    __metadata("design:paramtypes", [discount_service_1.DiscountService])
], DiscountController);
//# sourceMappingURL=discount.controller.js.map