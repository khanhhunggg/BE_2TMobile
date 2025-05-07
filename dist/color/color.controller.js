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
exports.ColorController = void 0;
const common_1 = require("@nestjs/common");
const color_service_1 = require("./color.service");
const color_response_dto_1 = require("../dto/color-response.dto");
const swagger_1 = require("@nestjs/swagger");
let ColorController = class ColorController {
    constructor(colorService) {
        this.colorService = colorService;
    }
    async getAllColors(data) {
        return await this.colorService.getAllColors(data);
    }
    async getColorById(id) {
        return await this.colorService.getColorById(id);
    }
};
exports.ColorController = ColorController;
__decorate([
    (0, common_1.Get)('get-all-colors'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả màu sắc' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [color_response_dto_1.ColorResponseDto]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "getAllColors", null);
__decorate([
    (0, common_1.Get)('get-color-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy màu sắc theo ID' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [color_response_dto_1.ColorResponseDto]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "getColorById", null);
exports.ColorController = ColorController = __decorate([
    (0, swagger_1.ApiTags)('Màu sắc'),
    (0, common_1.Controller)('colors'),
    __metadata("design:paramtypes", [color_service_1.ColorService])
], ColorController);
//# sourceMappingURL=color.controller.js.map