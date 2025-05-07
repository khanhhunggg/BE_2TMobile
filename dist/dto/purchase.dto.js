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
exports.GetPurchaseListDto = exports.DeletePurchaseDto = exports.GetPurchaseByDateRangeDto = exports.GetPurchaseByVendorDto = exports.GetPurchaseByIdDto = exports.UpdatePurchaseDto = exports.CreatePurchaseDto = exports.PurchaseItemDto = exports.PaymentMethod = exports.PurchaseStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const common_dto_1 = require("../common/common.dto");
var PurchaseStatus;
(function (PurchaseStatus) {
    PurchaseStatus["PENDING"] = "PENDING";
    PurchaseStatus["COMPLETED"] = "COMPLETED";
    PurchaseStatus["CANCELLED"] = "CANCELLED";
})(PurchaseStatus || (exports.PurchaseStatus = PurchaseStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["BANK_TRANSFER"] = "BANK_TRANSFER";
    PaymentMethod["CREDIT_CARD"] = "CREDIT_CARD";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
class PurchaseItemDto {
}
exports.PurchaseItemDto = PurchaseItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Product ID', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PurchaseItemDto.prototype, "ProductId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Quantity', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PurchaseItemDto.prototype, "Quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Unit Price', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PurchaseItemDto.prototype, "UnitPrice", void 0);
class CreatePurchaseDto {
}
exports.CreatePurchaseDto = CreatePurchaseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Lot Code', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "LotCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Item Type', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "ItemType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Vendor ID', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePurchaseDto.prototype, "VendorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Payment Method',
        required: false,
        enum: PaymentMethod,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PaymentMethod),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "PaymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Order Date', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "OrderDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Order Time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "OrderTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Status',
        required: false,
        enum: PurchaseStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PurchaseStatus),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "Status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Note', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "Note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PurchaseItemDto],
        description: 'Purchase Items',
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PurchaseItemDto),
    __metadata("design:type", Array)
], CreatePurchaseDto.prototype, "Items", void 0);
class UpdatePurchaseDto {
}
exports.UpdatePurchaseDto = UpdatePurchaseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Purchase ID',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdatePurchaseDto.prototype, "Id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Lot Code',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdatePurchaseDto.prototype, "LotCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Item Type',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdatePurchaseDto.prototype, "ItemType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Vendor ID',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdatePurchaseDto.prototype, "VendorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Payment Method',
        required: false,
        enum: PaymentMethod,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PaymentMethod),
    __metadata("design:type", String)
], UpdatePurchaseDto.prototype, "PaymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Order Date (YYYY-MM-DD)',
        required: false,
        format: 'date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdatePurchaseDto.prototype, "OrderDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Order Time',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePurchaseDto.prototype, "OrderTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Status',
        required: false,
        enum: PurchaseStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PurchaseStatus),
    __metadata("design:type", String)
], UpdatePurchaseDto.prototype, "Status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Note',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdatePurchaseDto.prototype, "Note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PurchaseItemDto],
        description: 'Purchase Items',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PurchaseItemDto),
    __metadata("design:type", Array)
], UpdatePurchaseDto.prototype, "Items", void 0);
class GetPurchaseByIdDto {
}
exports.GetPurchaseByIdDto = GetPurchaseByIdDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Purchase ID', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetPurchaseByIdDto.prototype, "Id", void 0);
class GetPurchaseByVendorDto extends common_dto_1.PaginationResponseDto {
}
exports.GetPurchaseByVendorDto = GetPurchaseByVendorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Vendor ID', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetPurchaseByVendorDto.prototype, "VendorId", void 0);
class GetPurchaseByDateRangeDto extends common_dto_1.PaginationResponseDto {
}
exports.GetPurchaseByDateRangeDto = GetPurchaseByDateRangeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Start Date', required: true }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetPurchaseByDateRangeDto.prototype, "StartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'End Date', required: true }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetPurchaseByDateRangeDto.prototype, "EndDate", void 0);
class DeletePurchaseDto {
}
exports.DeletePurchaseDto = DeletePurchaseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Purchase ID', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeletePurchaseDto.prototype, "Id", void 0);
class GetPurchaseListDto {
    constructor() {
        this.page = 1;
        this.size = 10;
        this.search = '';
        this.sortBy = 'orderDate';
        this.sortDirection = 'DESC';
    }
}
exports.GetPurchaseListDto = GetPurchaseListDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Page number for pagination',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPurchaseListDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Number of items per page',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPurchaseListDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Search term for lot code, vendor name or vendor code',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPurchaseListDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Filter by purchase status',
        required: false,
        enum: PurchaseStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PurchaseStatus),
    __metadata("design:type", String)
], GetPurchaseListDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Filter by vendor ID',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPurchaseListDto.prototype, "vendorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        description: 'Start date for date range filter (YYYY-MM-DD)',
        required: false,
        format: 'date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], GetPurchaseListDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        description: 'End date for date range filter (YYYY-MM-DD)',
        required: false,
        format: 'date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], GetPurchaseListDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Sắp xếp theo',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPurchaseListDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Hướng sắp xếp',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPurchaseListDto.prototype, "sortDirection", void 0);
//# sourceMappingURL=purchase.dto.js.map