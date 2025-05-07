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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const review_dto_1 = require("../dto/review.dto");
const review_service_1 = require("./review.service");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async CreateReview(review) {
        return await this.reviewService.doCreateReview(review);
    }
    async GetReviewById(data) {
        return await this.reviewService.doGetReviewById(data);
    }
    async GetReviewsByProduct(data) {
        return await this.reviewService.doGetReviewsByProduct(data);
    }
    async GetReviewsByUser(data) {
        return await this.reviewService.doGetReviewsByUser(data);
    }
    async UpdateReview(data) {
        return await this.reviewService.doUpdateReview(data);
    }
    async DeleteReview(data) {
        return await this.reviewService.doDeleteReview(data);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Post)('create-review'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo đánh giá mới' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "CreateReview", null);
__decorate([
    (0, common_1.Get)('get-review-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy đánh giá theo ID' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.GetReviewByIdDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "GetReviewById", null);
__decorate([
    (0, common_1.Get)('get-reviews-by-product'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách đánh giá theo sản phẩm' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.GetReviewsByProductDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "GetReviewsByProduct", null);
__decorate([
    (0, common_1.Get)('get-reviews-by-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách đánh giá theo người dùng' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.GetReviewsByUserDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "GetReviewsByUser", null);
__decorate([
    (0, common_1.Put)('update-review'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật đánh giá' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "UpdateReview", null);
__decorate([
    (0, common_1.Delete)('delete-review'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa đánh giá' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.DeleteReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "DeleteReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, swagger_1.ApiTags)('Đánh giá'),
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map