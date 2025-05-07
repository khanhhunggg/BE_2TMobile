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
exports.CreateSpecsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSpecsDto {
}
exports.CreateSpecsDto = CreateSpecsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Kích thước màn hình',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpecsDto.prototype, "screen_size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Độ phân giải', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpecsDto.prototype, "resolution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Chipset', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpecsDto.prototype, "chipset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'RAM', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpecsDto.prototype, "ram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Hệ điều hành', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpecsDto.prototype, "os", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Dung lượng pin', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpecsDto.prototype, "battery_capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Công nghệ sạc', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpecsDto.prototype, "charging_tech", void 0);
//# sourceMappingURL=specs.dto.js.map