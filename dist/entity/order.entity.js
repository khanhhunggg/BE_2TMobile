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
exports.Order = exports.OrderStatus = exports.PaymentMethod = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const order_detail_entity_1 = require("./order-detail.entity");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["BANKING"] = "BANKING";
    PaymentMethod["CAST"] = "CAST";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["DELIVERY"] = "DELIVERY";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["CANCLED"] = "CANCLED";
    OrderStatus["RETURN"] = "RETURN";
    OrderStatus["RETURNED"] = "RETURNED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PaymentMethod }),
    __metadata("design:type", String)
], Order.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Order.prototype, "order_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "expected_delivery_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "delivered_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_detail_entity_1.OrderDetail, (orderDetail) => orderDetail.order),
    __metadata("design:type", Array)
], Order.prototype, "orderDetails", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)('tbl_order')
], Order);
//# sourceMappingURL=order.entity.js.map