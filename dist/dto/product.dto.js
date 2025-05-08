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
exports.GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto = exports.DeleteProductDto = exports.SearchProductDto = exports.GetProductByIdDto = exports.UpdateProductDto = exports.CreateProductDto = exports.ProductDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const specs_dto_1 = require("./specs.dto");
class ProductDetailDto {
}
exports.ProductDetailDto = ProductDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID chi tiết sản phẩm',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductDetailDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID màu sắc', required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ProductDetailDto.prototype, "color_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID dung lượng', required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ProductDetailDto.prototype, "capacity_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Số lượng tồn kho',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ProductDetailDto.prototype, "stock_quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Số seri', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProductDetailDto.prototype, "serial_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Giá nhập',
        required: true,
        example: '1000000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductDetailDto.prototype, "import_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Giá bán',
        required: true,
        example: '1100000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductDetailDto.prototype, "selling_price", void 0);
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Tên sản phẩm', required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Mô tả sản phẩm', required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Năm sản xuất', required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "release_year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Năm sản xuất', required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "warranty_period", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: 'Trạng thái sản phẩm',
        required: true,
    }),
    (0, class_validator_1.IsEnum)(['Active', 'Inactive']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID nhà cung cấp', required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "vendor_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [Number],
        description: 'Danh sách ID màu sắc',
        required: false,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "color_ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID dung lượng', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "capacity_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: 'Sản phẩm đặc biệt',
        required: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "is_featured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Model sản phẩm', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: specs_dto_1.CreateSpecsDto,
        description: 'Thông số kỹ thuật',
        required: false,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => specs_dto_1.CreateSpecsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", specs_dto_1.CreateSpecsDto)
], CreateProductDto.prototype, "specs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        description: 'Danh sách URL hình ảnh sản phẩm',
        required: false,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "image_urls", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ProductDetailDto],
        description: 'Danh sách chi tiết sản phẩm',
        required: false,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductDetailDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "productDetail", void 0);
class UpdateProductDto {
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID sản phẩm', required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Tên sản phẩm', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Model sản phẩm', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Mô tả sản phẩm', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Thời gian bảo hành',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "warranty_period", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Năm sản xuất', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "release_year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: 'Sản phẩm đặc biệt',
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateProductDto.prototype, "is_featured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Trạng thái',
        required: false,
        enum: ['Active', 'Inactive'],
    }),
    (0, class_validator_1.IsEnum)(['Active', 'Inactive']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID nhà cung cấp',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "vendor_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID màu sắc',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "color_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID dung lượng', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "capacity_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Số lượng tồn kho',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "stock_quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Số seri', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "serial_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Giá nhập',
        required: false,
        example: '1000000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "import_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Giá bán',
        required: false,
        example: '1100000',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "selling_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: specs_dto_1.CreateSpecsDto,
        description: 'Thông số kỹ thuật',
        required: false,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => specs_dto_1.CreateSpecsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", specs_dto_1.CreateSpecsDto)
], UpdateProductDto.prototype, "specs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        description: 'Danh sách URL hình ảnh sản phẩm',
        required: false,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "image_urls", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ProductDetailDto],
        description: 'Danh sách chi tiết sản phẩm',
        required: false,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductDetailDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "productDetail", void 0);
class GetProductByIdDto {
}
exports.GetProductByIdDto = GetProductByIdDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID sản phẩm', required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetProductByIdDto.prototype, "id", void 0);
class SearchProductDto {
}
exports.SearchProductDto = SearchProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID sản phẩm', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchProductDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Tên sản phẩm', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Model sản phẩm', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchProductDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID nhà cung cấp',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchProductDto.prototype, "vendor_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID màu sắc',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchProductDto.prototype, "color_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [Number],
        description: 'Danh sách ID màu sắc',
        required: false,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SearchProductDto.prototype, "color_ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID dung lượng', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchProductDto.prototype, "capacity_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Trạng thái sản phẩm',
        required: false,
        enum: ['Active', 'Inactive'],
    }),
    (0, class_validator_1.IsEnum)(['Active', 'Inactive']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchProductDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: 'Sản phẩm đặc biệt',
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SearchProductDto.prototype, "is_featured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Số trang',
        required: false,
        default: 1,
    }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchProductDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Số lượng sản phẩm trên mỗi trang',
        required: false,
        default: 10,
    }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchProductDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Trường sắp xếp',
        required: false,
        default: 'created_at',
        enum: [
            'name',
            'model',
            'created_at',
            'updated_at',
            'release_year',
            'warranty_period',
        ],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchProductDto.prototype, "sort_by", void 0);
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
], SearchProductDto.prototype, "sort_order", void 0);
class DeleteProductDto {
}
exports.DeleteProductDto = DeleteProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'ID sản phẩm cần xóa',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], DeleteProductDto.prototype, "id", void 0);
class GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto {
}
exports.GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto = GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID sản phẩm', required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID màu sắc', required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto.prototype, "color_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID dung lượng', required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto.prototype, "capacity_id", void 0);
//# sourceMappingURL=product.dto.js.map