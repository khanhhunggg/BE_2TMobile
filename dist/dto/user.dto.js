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
exports.DeleteUserDto = exports.UpdateProfileDto = exports.UpdateDtoQuery = exports.UpdateUserDto = exports.CreateUserDto = exports.GetUserByEmailDto = exports.ChangePassWordDto = exports.SignInDto = exports.SignUpDto = exports.UserJwtDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_dto_1 = require("../common/common.dto");
class UserJwtDto {
}
exports.UserJwtDto = UserJwtDto;
class SignUpDto {
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Email', required: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "Email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'PassWord', required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "Password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'PhoneNumber', required: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "PhoneNumber", void 0);
class SignInDto {
}
exports.SignInDto = SignInDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'PhoneNumber', required: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], SignInDto.prototype, "PhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'PassWord', required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignInDto.prototype, "Password", void 0);
class ChangePassWordDto {
}
exports.ChangePassWordDto = ChangePassWordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'PhoneNumber', required: true }),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], ChangePassWordDto.prototype, "PhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'OldPassWord', required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePassWordDto.prototype, "OldPassWord", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'NewPassWord', required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePassWordDto.prototype, "NewPassWord", void 0);
class GetUserByEmailDto extends common_dto_1.PaginationResponseDto {
}
exports.GetUserByEmailDto = GetUserByEmailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Email', required: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], GetUserByEmailDto.prototype, "Email", void 0);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Username', required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'FullName', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "FullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Email', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'PhoneNumber', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 15),
    __metadata("design:type", String)
], CreateUserDto.prototype, "PhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Address', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 255),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Role', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Admin', 'Customer']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Gender', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Male', 'Female', 'Other']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'BirthDate', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "BirthDate", void 0);
class UpdateUserDto extends CreateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
class UpdateDtoQuery {
}
exports.UpdateDtoQuery = UpdateDtoQuery;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDtoQuery.prototype, "id", void 0);
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProfileDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'FullName', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 100),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "FullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'PhoneNumber', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 15),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "PhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Address', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 255),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "Address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Gender', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Male', 'Female', 'Other']),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "Gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'BirthDate', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "BirthDate", void 0);
class DeleteUserDto {
}
exports.DeleteUserDto = DeleteUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'ID', required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeleteUserDto.prototype, "Id", void 0);
//# sourceMappingURL=user.dto.js.map