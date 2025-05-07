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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const typeorm_2 = require("typeorm");
const user_module_1 = require("./user/user.module");
const product_module_1 = require("./product/product.module");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const cart_module_1 = require("./cart/cart.module");
const color_module_1 = require("./color/color.module");
const capacity_module_1 = require("./capacity/capacity.module");
const vendor_module_1 = require("./vendor/vendor.module");
const payment_module_1 = require("./payment/payment.module");
const order_module_1 = require("./order/order.module");
const vendor_bill_module_1 = require("./vendor-bill/vendor-bill.module");
const purchase_module_1 = require("./payment/purchase.module");
const discount_module_1 = require("./discount/discount.module");
const review_module_1 = require("./review/review.module");
const return_module_1 = require("./return/return.module");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123456',
                database: '2t_mobile',
                entities: [(0, path_1.join)(__dirname, '**', '*.entity{.ts,.js}')],
                synchronize: false,
                logging: false,
                namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
            }),
            user_module_1.UserModule,
            product_module_1.ProductModule,
            color_module_1.ColorModule,
            capacity_module_1.CapacityModule,
            vendor_module_1.VendorModule,
            payment_module_1.PaymentModule,
            order_module_1.OrderModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            cart_module_1.CartModule,
            payment_module_1.PaymentModule,
            order_module_1.OrderModule,
            purchase_module_1.PurchaseModule,
            vendor_bill_module_1.VendorBillModule,
            discount_module_1.DiscountModule,
            review_module_1.ReviewModule,
            return_module_1.ReturnModule,
        ],
        controllers: [],
        providers: [],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
//# sourceMappingURL=app.module.js.map