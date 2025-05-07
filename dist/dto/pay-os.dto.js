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
exports.WebhookDataDto = exports.CheckoutRequestType = void 0;
const swagger_1 = require("@nestjs/swagger");
class CheckoutRequestType {
}
exports.CheckoutRequestType = CheckoutRequestType;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order code for the checkout' }),
    __metadata("design:type", Number)
], CheckoutRequestType.prototype, "orderCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total amount of the order' }),
    __metadata("design:type", Number)
], CheckoutRequestType.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the order' }),
    __metadata("design:type", String)
], CheckoutRequestType.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL to redirect when payment is cancelled' }),
    __metadata("design:type", String)
], CheckoutRequestType.prototype, "cancelUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL to redirect when payment is successful' }),
    __metadata("design:type", String)
], CheckoutRequestType.prototype, "returnUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Signature for payment verification',
        required: false,
    }),
    __metadata("design:type", String)
], CheckoutRequestType.prototype, "signature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of items in the order',
        required: false,
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                quantity: { type: 'number' },
                price: { type: 'number' },
            },
        },
    }),
    __metadata("design:type", Array)
], CheckoutRequestType.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the buyer', required: false }),
    __metadata("design:type", String)
], CheckoutRequestType.prototype, "buyerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email of the buyer', required: false }),
    __metadata("design:type", String)
], CheckoutRequestType.prototype, "buyerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone number of the buyer', required: false }),
    __metadata("design:type", String)
], CheckoutRequestType.prototype, "buyerPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address of the buyer', required: false }),
    __metadata("design:type", String)
], CheckoutRequestType.prototype, "buyerAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Expiration timestamp of the payment',
        required: false,
    }),
    __metadata("design:type", Number)
], CheckoutRequestType.prototype, "expiredAt", void 0);
class WebhookDataDto {
}
exports.WebhookDataDto = WebhookDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response code' }),
    __metadata("design:type", String)
], WebhookDataDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response description' }),
    __metadata("design:type", String)
], WebhookDataDto.prototype, "desc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Success status' }),
    __metadata("design:type", Boolean)
], WebhookDataDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Webhook signature' }),
    __metadata("design:type", String)
], WebhookDataDto.prototype, "signature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Webhook data' }),
    __metadata("design:type", Object)
], WebhookDataDto.prototype, "data", void 0);
//# sourceMappingURL=pay-os.dto.js.map