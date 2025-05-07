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
exports.ReturnController = void 0;
const common_1 = require("@nestjs/common");
const return_service_1 = require("./return.service");
const return_dto_1 = require("../dto/return.dto");
const return_detail_entity_1 = require("../entity/return-detail.entity");
const return_entity_1 = require("../entity/return.entity");
const return_detail_entity_2 = require("../entity/return-detail.entity");
const return_entity_2 = require("../entity/return.entity");
const swagger_1 = require("@nestjs/swagger");
let ReturnController = class ReturnController {
    constructor(returnService) {
        this.returnService = returnService;
    }
    async create(createReturnDto) {
        return await this.returnService.create(createReturnDto);
    }
    async findAll(status, type, customerId) {
        return await this.returnService.findAll();
    }
    async findOne(id) {
        return await this.returnService.findOne(id);
    }
    async update(id, updateReturnDto) {
        return await this.returnService.update(id, updateReturnDto);
    }
    async remove(id) {
        await this.returnService.remove(id);
    }
    async createReturnDetail(id, createReturnDetailDto) {
        return await this.returnService.createReturnDetail(id, createReturnDetailDto);
    }
    async getReturnDetails(id, status) {
        return await this.returnService.getReturnDetails(id);
    }
    async updateReturnDetailStatus(id, detailId, status) {
        return await this.returnService.updateReturnDetailStatus(id, detailId, status);
    }
};
exports.ReturnController = ReturnController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo mới đơn trả hàng' }),
    (0, swagger_1.ApiBody)({ type: return_dto_1.CreateReturnDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Đơn trả hàng đã được tạo thành công',
        type: return_entity_1.Return,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Dữ liệu nhập không hợp lệ',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [return_dto_1.CreateReturnDto]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách tất cả đơn trả hàng' }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: return_detail_entity_1.ReturnStatus, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', enum: return_entity_2.ReturnType, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'customerId', type: 'number', required: false }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Danh sách tất cả đơn trả hàng',
        type: [return_entity_1.Return],
    }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy đơn trả hàng theo id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID đơn trả hàng' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Đơn trả hàng đã được tìm thấy',
        type: return_entity_1.Return,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Đơn trả hàng không được tìm thấy',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật đơn trả hàng' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID đơn trả hàng' }),
    (0, swagger_1.ApiBody)({ type: return_dto_1.UpdateReturnDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Đơn trả hàng đã được cập nhật thành công',
        type: return_entity_1.Return,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Đơn trả hàng không được tìm thấy',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Dữ liệu nhập không hợp lệ',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, return_dto_1.UpdateReturnDto]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa đơn trả hàng' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID đơn trả hàng' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Đơn trả hàng đã được xóa thành công',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Đơn trả hàng không được tìm thấy',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/details'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo chi tiết trả hàng' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID đơn trả hàng' }),
    (0, swagger_1.ApiBody)({ type: return_dto_1.CreateReturnDetailDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Chi tiết trả hàng đã được tạo thành công',
        type: return_detail_entity_2.ReturnDetail,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Đơn trả hàng không được tìm thấy',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Dữ liệu nhập không hợp lệ',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, return_dto_1.CreateReturnDetailDto]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "createReturnDetail", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả chi tiết cho đơn trả hàng' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID đơn trả hàng' }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: return_detail_entity_1.ReturnStatus, required: false }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Danh sách chi tiết trả hàng',
        type: [return_detail_entity_2.ReturnDetail],
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Đơn trả hàng không được tìm thấy',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "getReturnDetails", null);
__decorate([
    (0, common_1.Patch)(':id/details/:detailId/status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật trạng thái chi tiết trả hàng' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID đơn trả hàng' }),
    (0, swagger_1.ApiParam)({
        name: 'detailId',
        type: 'number',
        description: 'ID chi tiết trả hàng',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                    enum: Object.values(return_detail_entity_1.ReturnStatus),
                    example: return_detail_entity_1.ReturnStatus.APPROVED,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Trạng thái chi tiết trả hàng đã được cập nhật thành công',
        type: return_detail_entity_2.ReturnDetail,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Đơn trả hàng hoặc chi tiết trả hàng không được tìm thấy',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Giá trị trạng thái không hợp lệ',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('detailId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ReturnController.prototype, "updateReturnDetailStatus", null);
exports.ReturnController = ReturnController = __decorate([
    (0, swagger_1.ApiTags)('Trả hàng'),
    (0, common_1.Controller)('returns'),
    __metadata("design:paramtypes", [return_service_1.ReturnService])
], ReturnController);
//# sourceMappingURL=return.controller.js.map