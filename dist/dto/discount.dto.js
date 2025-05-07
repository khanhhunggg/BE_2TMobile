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
exports.RemoveDiscountFromUserDto = exports.AssignDiscountToUserDto = exports.DeleteDiscountDto = exports.SearchDiscountDto = exports.GetDiscountByIdDto = exports.UpdateDiscountDto = exports.CreateDiscountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const discount_entity_1 = require("../entity/discount.entity");
class CreateDiscountDto {
}
exports.CreateDiscountDto = CreateDiscountDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Tiêu đề khuyến mãi',
        required: true,
        example: 'Khuyến mãi tháng 12',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Mô tả khuyến mãi',
        required: false,
        example: 'Giảm giá 20% cho tất cả sản phẩm',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Loại khuyến mãi',
        required: true,
        enum: discount_entity_1.DiscountType,
        example: discount_entity_1.DiscountType.PERCENTAGE,
    }),
    (0, class_validator_1.IsEnum)(discount_entity_1.DiscountType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "discount_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Giá trị khuyến mãi',
        required: true,
        example: 20,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateDiscountDto.prototype, "discount_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Ngày bắt đầu (YYYY-MM-DD HH:mm:ss)',
        required: true,
        example: '2024-01-01 00:00:00',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Ngày kết thúc (YYYY-MM-DD HH:mm:ss)',
        required: true,
        example: '2024-01-31 23:59:59',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: 'Trạng thái hoạt động',
        required: false,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateDiscountDto.prototype, "is_active", void 0);
class UpdateDiscountDto {
}
exports.UpdateDiscountDto = UpdateDiscountDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID khuyến mãi',
        required: true,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateDiscountDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Tiêu đề khuyến mãi',
        required: false,
        example: 'Khuyến mãi tháng 12',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDiscountDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Mô tả khuyến mãi',
        required: false,
        example: 'Giảm giá 20% cho tất cả sản phẩm',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDiscountDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Loại khuyến mãi',
        required: false,
        enum: discount_entity_1.DiscountType,
        example: discount_entity_1.DiscountType.PERCENTAGE,
    }),
    (0, class_validator_1.IsEnum)(discount_entity_1.DiscountType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDiscountDto.prototype, "discount_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Giá trị khuyến mãi',
        required: false,
        example: 20,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDiscountDto.prototype, "discount_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Ngày bắt đầu (YYYY-MM-DD HH:mm:ss)',
        required: false,
        example: '2024-01-01 00:00:00',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDiscountDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Ngày kết thúc (YYYY-MM-DD HH:mm:ss)',
        required: false,
        example: '2024-01-31 23:59:59',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDiscountDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: 'Trạng thái hoạt động',
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateDiscountDto.prototype, "is_active", void 0);
class GetDiscountByIdDto {
}
exports.GetDiscountByIdDto = GetDiscountByIdDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID khuyến mãi',
        required: true,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetDiscountByIdDto.prototype, "id", void 0);
class SearchDiscountDto {
}
exports.SearchDiscountDto = SearchDiscountDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Tiêu đề khuyến mãi',
        required: false,
        example: 'Khuyến mãi',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchDiscountDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Loại khuyến mãi',
        required: false,
        enum: discount_entity_1.DiscountType,
        example: discount_entity_1.DiscountType.PERCENTAGE,
    }),
    (0, class_validator_1.IsEnum)(discount_entity_1.DiscountType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchDiscountDto.prototype, "discount_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: 'Trạng thái hoạt động',
        required: false,
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SearchDiscountDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Số trang',
        required: false,
        default: 1,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchDiscountDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Số lượng trên mỗi trang',
        required: false,
        default: 10,
        example: 10,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchDiscountDto.prototype, "size", void 0);
class DeleteDiscountDto {
}
exports.DeleteDiscountDto = DeleteDiscountDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID khuyến mãi cần xóa',
        required: true,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], DeleteDiscountDto.prototype, "id", void 0);
class AssignDiscountToUserDto {
}
exports.AssignDiscountToUserDto = AssignDiscountToUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID khuyến mãi',
        required: true,
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AssignDiscountToUserDto.prototype, "discount_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID người dùng',
        required: true,
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AssignDiscountToUserDto.prototype, "user_id", void 0);
class RemoveDiscountFromUserDto {
}
exports.RemoveDiscountFromUserDto = RemoveDiscountFromUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID khuyến mãi',
        required: true,
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RemoveDiscountFromUserDto.prototype, "discount_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID người dùng',
        required: true,
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RemoveDiscountFromUserDto.prototype, "user_id", void 0);
//# sourceMappingURL=discount.dto.js.map