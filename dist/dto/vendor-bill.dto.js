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
exports.DeleteVendorBillDto = exports.UpdateVendorBillDto = exports.SearchVendorBillDto = exports.GetVendorBillByIdDto = exports.CreateVendorBillDto = exports.VendorBillItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class VendorBillItemDto {
}
exports.VendorBillItemDto = VendorBillItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VendorBillItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VendorBillItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VendorBillItemDto.prototype, "unitPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VendorBillItemDto.prototype, "totalPrice", void 0);
class CreateVendorBillDto {
}
exports.CreateVendorBillDto = CreateVendorBillDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorBillDto.prototype, "lotCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorBillDto.prototype, "itemType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVendorBillDto.prototype, "vendorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorBillDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateVendorBillDto.prototype, "orderDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorBillDto.prototype, "orderTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorBillDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorBillDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [VendorBillItemDto], required: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => VendorBillItemDto),
    __metadata("design:type", Array)
], CreateVendorBillDto.prototype, "items", void 0);
class GetVendorBillByIdDto {
}
exports.GetVendorBillByIdDto = GetVendorBillByIdDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetVendorBillByIdDto.prototype, "id", void 0);
class SearchVendorBillDto {
}
exports.SearchVendorBillDto = SearchVendorBillDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchVendorBillDto.prototype, "lotCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchVendorBillDto.prototype, "itemType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchVendorBillDto.prototype, "vendorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchVendorBillDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchVendorBillDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchVendorBillDto.prototype, "size", void 0);
class UpdateVendorBillDto extends CreateVendorBillDto {
}
exports.UpdateVendorBillDto = UpdateVendorBillDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateVendorBillDto.prototype, "id", void 0);
class DeleteVendorBillDto {
}
exports.DeleteVendorBillDto = DeleteVendorBillDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteVendorBillDto.prototype, "id", void 0);
//# sourceMappingURL=vendor-bill.dto.js.map