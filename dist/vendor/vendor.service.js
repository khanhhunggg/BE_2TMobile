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
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vendor_entity_1 = require("../entity/vendor.entity");
let VendorService = class VendorService {
    constructor(vendorRepository) {
        this.vendorRepository = vendorRepository;
    }
    async doCreateVendor(data) {
        const vendor = this.vendorRepository.create({
            vendorCode: data.vendor_code,
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
        });
        const savedVendor = await this.vendorRepository.save(vendor);
        return {
            id: savedVendor.id,
            vendor_code: savedVendor.vendorCode,
            name: savedVendor.name,
            phone: savedVendor.phone,
            email: savedVendor.email,
            address: savedVendor.address,
        };
    }
    async doUpdateVendor(data) {
        const vendor = await this.vendorRepository.findOne({
            where: { id: data.id },
        });
        if (!vendor) {
            throw new Error('Vendor not found');
        }
        const updateData = {};
        if (data.vendor_code)
            updateData.vendorCode = data.vendor_code;
        if (data.name)
            updateData.name = data.name;
        if (data.phone)
            updateData.phone = data.phone;
        if (data.email)
            updateData.email = data.email;
        if (data.address)
            updateData.address = data.address;
        await this.vendorRepository.update(data.id, updateData);
        const updatedVendor = await this.vendorRepository.findOne({
            where: { id: data.id },
        });
        return {
            id: updatedVendor.id,
            vendor_code: updatedVendor.vendorCode,
            name: updatedVendor.name,
            phone: updatedVendor.phone,
            email: updatedVendor.email,
            address: updatedVendor.address,
        };
    }
    async doDeleteVendor(data) {
        const vendor = await this.vendorRepository.findOne({
            where: { id: data.id },
        });
        if (!vendor) {
            throw new Error('Vendor not found');
        }
        await this.vendorRepository.delete(data.id);
        return { message: 'Vendor deleted successfully' };
    }
    async getAllVendors(data) {
        const query = this.vendorRepository
            .createQueryBuilder('vendor')
            .select([
            'vendor.id',
            'vendor.vendorCode',
            'vendor.name',
            'vendor.phone',
            'vendor.email',
            'vendor.address',
        ]);
        if (data.name) {
            query.andWhere('vendor.name LIKE :name', { name: `%${data.name}%` });
        }
        if (data.vendor_code) {
            query.andWhere('vendor.vendorCode = :vendorCode', {
                vendorCode: data.vendor_code,
            });
        }
        query.orderBy('vendor.createdAt', 'DESC');
        const vendors = await query.getMany();
        return vendors.map((vendor) => ({
            id: vendor.id,
            vendor_code: vendor.vendorCode,
            name: vendor.name,
            phone: vendor.phone,
            email: vendor.email,
            address: vendor.address,
        }));
    }
    async getVendorById(id) {
        const query = this.vendorRepository
            .createQueryBuilder('vendor')
            .select([
            'vendor.id',
            'vendor.vendorCode',
            'vendor.name',
            'vendor.phone',
            'vendor.email',
            'vendor.address',
        ])
            .where('vendor.id = :id', { id: id.id });
        const vendor = await query.getOne();
        return {
            id: vendor.id,
            vendor_code: vendor.vendorCode,
            name: vendor.name,
            phone: vendor.phone,
            email: vendor.email,
            address: vendor.address,
        };
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VendorService);
//# sourceMappingURL=vendor.service.js.map