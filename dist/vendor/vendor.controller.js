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
exports.VendorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vendor_service_1 = require("./vendor.service");
const vendor_response_dto_1 = require("../dto/vendor-response.dto");
const vendor_response_dto_2 = require("../dto/vendor-response.dto");
let VendorController = class VendorController {
    constructor(vendorService) {
        this.vendorService = vendorService;
    }
    async createVendor(data) {
        return await this.vendorService.doCreateVendor(data);
    }
    async updateVendor(data) {
        return await this.vendorService.doUpdateVendor(data);
    }
    async deleteVendor(data) {
        return await this.vendorService.doDeleteVendor(data);
    }
    async getAllVendors(data) {
        return await this.vendorService.getAllVendors(data);
    }
    async getVendorById(id) {
        return await this.vendorService.getVendorById(id);
    }
};
exports.VendorController = VendorController;
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo mới nhà cung cấp' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_response_dto_2.CreateVendorDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "createVendor", null);
__decorate([
    (0, common_1.Put)('update'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin nhà cung cấp' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_response_dto_2.UpdateVendorDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "updateVendor", null);
__decorate([
    (0, common_1.Delete)('delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa nhà cung cấp' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_response_dto_2.DeleteVendorDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "deleteVendor", null);
__decorate([
    (0, common_1.Get)('get-all-vendors'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả nhà cung cấp' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_response_dto_1.VendorResponseDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "getAllVendors", null);
__decorate([
    (0, common_1.Get)('get-vendor-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy nhà cung cấp theo ID' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_response_dto_1.VendorResponseDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "getVendorById", null);
exports.VendorController = VendorController = __decorate([
    (0, swagger_1.ApiTags)('Nhà cung cấp'),
    (0, common_1.Controller)('vendors'),
    __metadata("design:paramtypes", [vendor_service_1.VendorService])
], VendorController);
//# sourceMappingURL=vendor.controller.js.map