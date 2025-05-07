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
exports.VendorBillController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vendor_bill_service_1 = require("./vendor-bill.service");
const vendor_bill_dto_1 = require("../dto/vendor-bill.dto");
let VendorBillController = class VendorBillController {
    constructor(vendorBillService) {
        this.vendorBillService = vendorBillService;
    }
    async createVendorBill(data) {
        return this.vendorBillService.doCreateVendorBill(data);
    }
    async getAllVendorBill(searchParams) {
        return this.vendorBillService.doGetAllVendorBill(searchParams);
    }
    async getVendorBillById(data) {
        return this.vendorBillService.doGetVendorBillById(data);
    }
    async updateVendorBill(data) {
        return this.vendorBillService.doUpdateVendorBill(data);
    }
    async deleteVendorBill(data) {
        return this.vendorBillService.doDeleteVendorBill(data);
    }
};
exports.VendorBillController = VendorBillController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new vendor bill' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Vendor bill created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_bill_dto_1.CreateVendorBillDto]),
    __metadata("design:returntype", Promise)
], VendorBillController.prototype, "createVendorBill", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all vendor bills' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of vendor bills' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_bill_dto_1.SearchVendorBillDto]),
    __metadata("design:returntype", Promise)
], VendorBillController.prototype, "getAllVendorBill", null);
__decorate([
    (0, common_1.Get)('get-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vendor bill by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor bill details' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_bill_dto_1.GetVendorBillByIdDto]),
    __metadata("design:returntype", Promise)
], VendorBillController.prototype, "getVendorBillById", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update vendor bill' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor bill updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_bill_dto_1.UpdateVendorBillDto]),
    __metadata("design:returntype", Promise)
], VendorBillController.prototype, "updateVendorBill", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete vendor bill' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor bill deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_bill_dto_1.DeleteVendorBillDto]),
    __metadata("design:returntype", Promise)
], VendorBillController.prototype, "deleteVendorBill", null);
exports.VendorBillController = VendorBillController = __decorate([
    (0, swagger_1.ApiTags)('Hóa đơn nhà cung cấp'),
    (0, common_1.Controller)('vendor-bill'),
    __metadata("design:paramtypes", [vendor_bill_service_1.VendorBillService])
], VendorBillController);
//# sourceMappingURL=vendor-bill.controller.js.map