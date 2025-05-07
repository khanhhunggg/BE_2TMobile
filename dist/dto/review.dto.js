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
exports.DeleteReviewDto = exports.GetReviewsByUserDto = exports.GetReviewsByProductDto = exports.GetReviewByIdDto = exports.UpdateReviewDto = exports.CreateReviewDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateReviewDto {
}
exports.CreateReviewDto = CreateReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của người dùng' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của chi tiết sản phẩm' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "productDetailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Đánh giá (1-5)', minimum: 1, maximum: 5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bình luận', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "comment", void 0);
class UpdateReviewDto {
}
exports.UpdateReviewDto = UpdateReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của đánh giá' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Đánh giá (1-5)',
        minimum: 1,
        maximum: 5,
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bình luận', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReviewDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái xác minh', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateReviewDto.prototype, "isVerified", void 0);
class GetReviewByIdDto {
}
exports.GetReviewByIdDto = GetReviewByIdDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của đánh giá' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetReviewByIdDto.prototype, "id", void 0);
class GetReviewsByProductDto {
}
exports.GetReviewsByProductDto = GetReviewsByProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của chi tiết sản phẩm' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetReviewsByProductDto.prototype, "productDetailId", void 0);
class GetReviewsByUserDto {
}
exports.GetReviewsByUserDto = GetReviewsByUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của người dùng' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetReviewsByUserDto.prototype, "userId", void 0);
class DeleteReviewDto {
}
exports.DeleteReviewDto = DeleteReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của đánh giá' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], DeleteReviewDto.prototype, "id", void 0);
//# sourceMappingURL=review.dto.js.map