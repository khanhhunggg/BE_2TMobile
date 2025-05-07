"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const common_module_1 = require("../common/common.module");
const helper_module_1 = require("../common/helper/helper.module");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const user_entity_1 = require("../entity/user.entity");
const user_information_entity_1 = require("../entity/user-information.entity");
const vendor_module_1 = require("../vendor/vendor.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_information_entity_1.UserInformation]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
            }),
            passport_1.PassportModule,
            common_module_1.CommonModule,
            helper_module_1.HelperModule,
            vendor_module_1.VendorModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [passport_1.PassportModule, user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map