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
exports.CapacityController = void 0;
const common_1 = require("@nestjs/common");
const capacity_service_1 = require("./capacity.service");
const capacity_response_dto_1 = require("../dto/capacity-response.dto");
const swagger_1 = require("@nestjs/swagger");
let CapacityController = class CapacityController {
    constructor(capacityService) {
        this.capacityService = capacityService;
    }
    async getAllCapacities(data) {
        return await this.capacityService.getAllCapacities(data);
    }
    async getCapacityById(id) {
        return await this.capacityService.getCapacityById(id);
    }
};
exports.CapacityController = CapacityController;
__decorate([
    (0, common_1.Get)('get-all-capacities'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả dung lượng' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách dung lượng',
        type: capacity_response_dto_1.CapacityResponseDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [capacity_response_dto_1.CapacityResponseDto]),
    __metadata("design:returntype", Promise)
], CapacityController.prototype, "getAllCapacities", null);
__decorate([
    (0, common_1.Get)('get-capacity-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy dung lượng theo ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin dung lượng',
        type: capacity_response_dto_1.CapacityResponseDto,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [capacity_response_dto_1.CapacityResponseDto]),
    __metadata("design:returntype", Promise)
], CapacityController.prototype, "getCapacityById", null);
exports.CapacityController = CapacityController = __decorate([
    (0, swagger_1.ApiTags)('Dung lượng'),
    (0, common_1.Controller)('capacities'),
    __metadata("design:paramtypes", [capacity_service_1.CapacityService])
], CapacityController);
//# sourceMappingURL=capacity.controller.js.map