import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CartModule } from './cart/cart.module';
import { ColorModule } from './color/color.module';
import { CapacityModule } from './capacity/capacity.module';
import { VendorModule } from './vendor/vendor.module';
import { PurchaseModule } from './purchase/purchase.module';
import { PayosModule } from './vietQrPayOs/payOs.module';
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
    PayosModule,
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET_KEY,
    //   signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CartModule,
    PurchaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
