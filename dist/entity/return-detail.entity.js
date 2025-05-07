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
exports.ReturnDetail = exports.ReturnStatus = void 0;
const typeorm_1 = require("typeorm");
const return_entity_1 = require("./return.entity");
var ReturnStatus;
(function (ReturnStatus) {
    ReturnStatus["PENDING"] = "Pending";
    ReturnStatus["APPROVED"] = "Approved";
    ReturnStatus["REJECTED"] = "Rejected";
    ReturnStatus["SHIPPING"] = "Shipping";
    ReturnStatus["COMPLETED"] = "Completed";
})(ReturnStatus || (exports.ReturnStatus = ReturnStatus = {}));
let ReturnDetail = class ReturnDetail {
};
exports.ReturnDetail = ReturnDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReturnDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'return_id' }),
    __metadata("design:type", Number)
], ReturnDetail.prototype, "returnId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReturnStatus,
        default: ReturnStatus.PENDING,
    }),
    __metadata("design:type", String)
], ReturnDetail.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_code', length: 50, nullable: true }),
    __metadata("design:type", String)
], ReturnDetail.prototype, "shippingCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'custom_reason', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ReturnDetail.prototype, "customReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], ReturnDetail.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ReturnDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ReturnDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => return_entity_1.Return, (returnEntity) => returnEntity.returnDetails, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'return_id' }),
    __metadata("design:type", return_entity_1.Return)
], ReturnDetail.prototype, "return", void 0);
exports.ReturnDetail = ReturnDetail = __decorate([
    (0, typeorm_1.Entity)('tbl_return_details')
], ReturnDetail);
//# sourceMappingURL=return-detail.entity.js.map