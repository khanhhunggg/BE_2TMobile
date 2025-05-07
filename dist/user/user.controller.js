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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_dto_1 = require("../common/common.dto");
const user_dto_1 = require("../dto/user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async SignUp(user) {
        return await this.userService.SignUp(user);
    }
    async Login(user) {
        return await this.userService.LogIn(user);
    }
    async LogOut(dto) {
        return await this.userService.LogOut(dto);
    }
    async ForgotPassword(dto) {
        return await this.userService.ResetPassword(dto);
    }
    async UpdateProfile(dto) {
        return await this.userService.UpdateProfile(dto);
    }
    async UpdateUserByID(dto, updateDto) {
        return await this.userService.updateUserById(dto, updateDto);
    }
    async DeleteUserById(dto) {
        return await this.userService.deleteUserById(dto.Id);
    }
    async DeleteUserByIds(ids) {
        return await this.userService.deleteUserByIds(ids);
    }
    async GetUserByEmail(dto) {
        return await this.userService.getAll(dto);
    }
    async GetUserByID(id) {
        return await this.userService.getUserByID(id);
    }
    async GetUserByKeyword(dto, paginationDto) {
        return await this.userService.getUserByKeyword(dto, paginationDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng kí' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "SignUp", null);
__decorate([
    (0, common_1.Post)('log-in'),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng nhập' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Login", null);
__decorate([
    (0, common_1.Post)('log-out'),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng xuất' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateDtoQuery]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "LogOut", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Đổi mật khẩu' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ChangePassWordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ForgotPassword", null);
__decorate([
    (0, common_1.Put)('update-profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin tài khoản' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UpdateProfile", null);
__decorate([
    (0, common_1.Put)('update-user-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin người dùng bằng id' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateDtoQuery,
        user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UpdateUserByID", null);
__decorate([
    (0, common_1.Delete)('delete-user-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa người dùng bằng id' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.DeleteUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "DeleteUserById", null);
__decorate([
    (0, common_1.Delete)('delete-user-by-ids'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa nhiều người dùng bằng id' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "DeleteUserByIds", null);
__decorate([
    (0, common_1.Get)('get-all-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by email' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.PaginationResponseDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetUserByEmail", null);
__decorate([
    (0, common_1.Get)('get-user-by-id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by id' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateDtoQuery]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetUserByID", null);
__decorate([
    (0, common_1.Get)('search-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by keyword' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.SearchDto,
        common_dto_1.PaginationResponseDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetUserByKeyword", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Tài khoản'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map