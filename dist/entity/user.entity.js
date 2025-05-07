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
exports.User = exports.UserRank = void 0;
const typeorm_1 = require("typeorm");
const user_information_entity_1 = require("./user-information.entity");
const cart_entity_1 = require("./cart.entity");
const review_entity_1 = require("./review.entity");
var UserRank;
(function (UserRank) {
    UserRank["Bronze"] = "Bronze";
    UserRank["Silver"] = "Silver";
    UserRank["Gold"] = "Gold";
    UserRank["Platinum"] = "Platinum";
    UserRank["Diamond"] = "Diamond";
})(UserRank || (exports.UserRank = UserRank = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'information_id', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "informationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_name', unique: true }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number' }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_admin', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_rank',
        type: 'enum',
        enum: UserRank,
        default: UserRank.Bronze,
        comment: 'Hạng thành viên dành cho khách hàng',
    }),
    __metadata("design:type", String)
], User.prototype, "userRank", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_information_entity_1.UserInformation, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'information_id' }),
    __metadata("design:type", user_information_entity_1.UserInformation)
], User.prototype, "userInformation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.Cart, (cart) => cart.user),
    __metadata("design:type", Array)
], User.prototype, "carts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.user),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('tbl_users')
], User);
//# sourceMappingURL=user.entity.js.map