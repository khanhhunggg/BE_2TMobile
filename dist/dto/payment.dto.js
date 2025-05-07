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
exports.DeletePaymentDto = exports.UpdatePaymentDto = exports.SearchPaymentDto = exports.GetPaymentByIdDto = exports.CreatePaymentLinkDto = exports.PaymentLinkResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PaymentLinkResponseDto {
}
exports.PaymentLinkResponseDto = PaymentLinkResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL thanh toán' }),
    __metadata("design:type", String)
], PaymentLinkResponseDto.prototype, "checkoutUrl", void 0);
class CreatePaymentLinkDto {
}
exports.CreatePaymentLinkDto = CreatePaymentLinkDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePaymentLinkDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePaymentLinkDto.prototype, "buyerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePaymentLinkDto.prototype, "buyerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePaymentLinkDto.prototype, "buyerPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePaymentLinkDto.prototype, "buyerAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unix timestamp for payment expiration (optional)',
        example: 1735689600,
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePaymentLinkDto.prototype, "expiredAt", void 0);
class GetPaymentByIdDto {
}
exports.GetPaymentByIdDto = GetPaymentByIdDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetPaymentByIdDto.prototype, "id", void 0);
class SearchPaymentDto {
}
exports.SearchPaymentDto = SearchPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchPaymentDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPaymentDto.prototype, "buyerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPaymentDto.prototype, "buyerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPaymentDto.prototype, "buyerPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchPaymentDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchPaymentDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trường sắp xếp',
        required: false,
        default: 'created_at',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        required: false,
        default: 'DESC',
    }),
    __metadata("design:type", String)
], SearchPaymentDto.prototype, "sort_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thứ tự sắp xếp',
        required: false,
        default: 'DESC',
    }),
    __metadata("design:type", String)
], SearchPaymentDto.prototype, "order", void 0);
class UpdatePaymentDto {
}
exports.UpdatePaymentDto = UpdatePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdatePaymentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdatePaymentDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "buyerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "buyerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "buyerPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "buyerAddress", void 0);
class DeletePaymentDto {
}
exports.DeletePaymentDto = DeletePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], DeletePaymentDto.prototype, "id", void 0);
//# sourceMappingURL=payment.dto.js.map