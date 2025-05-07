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
exports.CapacityResponseDto = void 0;
const capacity_entity_1 = require("../entity/capacity.entity");
const swagger_1 = require("@nestjs/swagger");
class CapacityResponseDto {
}
exports.CapacityResponseDto = CapacityResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID', required: false }),
    __metadata("design:type", Number)
], CapacityResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Giá trị dung lượng',
        required: false,
    }),
    __metadata("design:type", Number)
], CapacityResponseDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Đơn vị dung lượng',
        enum: capacity_entity_1.CapacityUnit,
        example: capacity_entity_1.CapacityUnit.GB,
    }),
    __metadata("design:type", String)
], CapacityResponseDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Tên hiển thị của dung lượng',
        required: false,
    }),
    __metadata("design:type", String)
], CapacityResponseDto.prototype, "display_name", void 0);
//# sourceMappingURL=capacity-response.dto.js.map