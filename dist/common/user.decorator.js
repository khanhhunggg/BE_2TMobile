"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReq = void 0;
const common_1 = require("@nestjs/common");
exports.UserReq = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
        throw new common_1.UnauthorizedException('TOKEN_INVALID');
    }
    return request.user;
});
//# sourceMappingURL=user.decorator.js.map