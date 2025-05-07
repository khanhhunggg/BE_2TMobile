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
exports.ReturnResponseDto = exports.CreateReturnDetailDto = exports.UpdateReturnDto = exports.CreateReturnDto = void 0;
const class_validator_1 = require("class-validator");
const return_entity_1 = require("../entity/return.entity");
const return_detail_entity_1 = require("../entity/return-detail.entity");
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateReturnDto {
}
exports.CreateReturnDto = CreateReturnDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order detail ID', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReturnDto.prototype, "orderDetailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Purchase detail ID', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReturnDto.prototype, "purchaseDetailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Admin ID', example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReturnDto.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer ID', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReturnDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Return code',
        example: 'RET001',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateReturnDto.prototype, "returnCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Return type',
        enum: return_entity_1.ReturnType,
        example: return_entity_1.ReturnType.REFUND,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(return_entity_1.ReturnType),
    __metadata("design:type", String)
], CreateReturnDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Refund amount',
        example: 100000,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateReturnDto.prototype, "refundAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reason ID', example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReturnDto.prototype, "reasonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Expected return date',
        example: '2024-03-20',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateReturnDto.prototype, "expectedReturnDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notes',
        example: 'Customer requested return due to wrong size',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateReturnDto.prototype, "notes", void 0);
class UpdateReturnDto extends (0, mapped_types_1.PartialType)(CreateReturnDto) {
}
exports.UpdateReturnDto = UpdateReturnDto;
class CreateReturnDetailDto {
}
exports.CreateReturnDetailDto = CreateReturnDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Return status',
        enum: return_detail_entity_1.ReturnStatus,
        example: return_detail_entity_1.ReturnStatus.PENDING,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(return_detail_entity_1.ReturnStatus),
    __metadata("design:type", String)
], CreateReturnDetailDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Shipping code',
        example: 'SHIP123',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateReturnDetailDto.prototype, "shippingCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custom reason',
        example: 'Product damaged during shipping',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateReturnDetailDto.prototype, "customReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Images of returned items',
        type: [String],
        example: ['image1.jpg', 'image2.jpg'],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateReturnDetailDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantity returned', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateReturnDetailDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product condition',
        example: 'Damaged',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateReturnDetailDto.prototype, "productCondition", void 0);
class ReturnResponseDto extends CreateReturnDto {
}
exports.ReturnResponseDto = ReturnResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Return ID', example: 1 }),
    __metadata("design:type", Number)
], ReturnResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at timestamp' }),
    __metadata("design:type", Date)
], ReturnResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at timestamp' }),
    __metadata("design:type", Date)
], ReturnResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateReturnDetailDto] }),
    __metadata("design:type", Array)
], ReturnResponseDto.prototype, "returnDetails", void 0);
//# sourceMappingURL=return.dto.js.map