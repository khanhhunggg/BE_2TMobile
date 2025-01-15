import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { CommonModule } from './common/common.module';
import { JwtAuthGuard } from './database/dto/user/jwt-auth.guard';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'dev_food_service',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: false,
      logging: false,
    }),
    CommonModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
