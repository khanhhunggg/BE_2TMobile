import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CapacityModule } from './capacity/capacity.module';
import { CartModule } from './cart/cart.module';
import { ColorModule } from './color/color.module';
import { DiscountModule } from './discount/discount.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { PurchaseModule } from './payment/purchase.module';
import { ProductModule } from './product/product.module';
import { ReturnModule } from './return/return.module';
import { ReviewModule } from './review/review.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { VendorBillModule } from './vendor-bill/vendor-bill.module';
import { VendorModule } from './vendor/vendor.module';
import { BankModule } from './bank/bank.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: '2t_mobile',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: false,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UserModule,
    ProductModule,
    ColorModule,
    CapacityModule,
    VendorModule,
    PaymentModule,
    OrderModule,
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET_KEY,
    //   signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CartModule,
    PaymentModule,
    OrderModule,
    PurchaseModule,
    VendorBillModule,
    DiscountModule,
    ReviewModule,
    ReturnModule,
    UploadModule,
    BankModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
