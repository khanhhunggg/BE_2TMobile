"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorBillModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vendor_bill_controller_1 = require("./vendor-bill.controller");
const vendor_bill_service_1 = require("./vendor-bill.service");
const purchase_entity_1 = require("../entity/purchase.entity");
const purchase_order_item_entity_1 = require("../entity/purchase-order-item.entity");
const product_detail_entity_1 = require("../entity/product-detail.entity");
let VendorBillModule = class VendorBillModule {
};
exports.VendorBillModule = VendorBillModule;
exports.VendorBillModule = VendorBillModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([purchase_entity_1.Purchase, purchase_order_item_entity_1.PurchaseOrderItem, product_detail_entity_1.ProductDetail]),
        ],
        controllers: [vendor_bill_controller_1.VendorBillController],
        providers: [vendor_bill_service_1.VendorBillService],
    })
], VendorBillModule);
//# sourceMappingURL=vendor-bill.module.js.map