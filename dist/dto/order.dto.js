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
exports.SearchOrderDto = exports.UpdateOrderDto = exports.CreateOrderDto = exports.CreateOrderDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const order_entity_1 = require("../entity/order.entity");
class CreateOrderDetailDto {
}
exports.CreateOrderDetailDto = CreateOrderDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Product detail ID',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDetailDto.prototype, "product_detail_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Cart detail ID',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrderDetailDto.prototype, "cart_detail_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Quantity of products',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDetailDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Price of the item',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDetailDto.prototype, "price", void 0);
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'User ID', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Payment method',
        required: true,
        enum: order_entity_1.PaymentMethod,
    }),
    (0, class_validator_1.IsEnum)(order_entity_1.PaymentMethod),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "payment_method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Expected delivery date',
        required: false,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateOrderDto.prototype, "expected_delivery_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Order status',
        required: false,
        enum: order_entity_1.OrderStatus,
        default: order_entity_1.OrderStatus.PENDING,
    }),
    (0, class_validator_1.IsEnum)(order_entity_1.OrderStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [CreateOrderDetailDto],
        description: 'Order details',
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateOrderDetailDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "order_details", void 0);
class UpdateOrderDto extends CreateOrderDto {
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Order ID', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "id", void 0);
class SearchOrderDto {
}
exports.SearchOrderDto = SearchOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Số trang',
        required: false,
        default: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchOrderDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Số lượng đơn hàng trên mỗi trang',
        required: false,
        default: 10,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchOrderDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Trạng thái đơn hàng',
        required: false,
        enum: order_entity_1.OrderStatus,
    }),
    (0, class_validator_1.IsEnum)(order_entity_1.OrderStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Phương thức thanh toán',
        required: false,
        enum: order_entity_1.PaymentMethod,
    }),
    (0, class_validator_1.IsEnum)(order_entity_1.PaymentMethod),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchOrderDto.prototype, "payment_method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Trường sắp xếp',
        required: false,
        default: 'created_at',
        enum: ['created_at', 'updated_at', 'total_amount', 'status'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchOrderDto.prototype, "sort_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Thứ tự sắp xếp',
        required: false,
        default: 'DESC',
        enum: ['ASC', 'DESC'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchOrderDto.prototype, "sort_order", void 0);
//# sourceMappingURL=order.dto.js.map