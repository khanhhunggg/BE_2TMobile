import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user.controller';
import { JwtStrategy } from 'src/database/dto/user/jwt.strategy';
import { User } from 'src/database/entity/user.entity';
import { UserService } from 'src/service/user.service';
import { CommonModule } from 'src/common/common.module';
import { HelperModule } from 'src/common/helper/helper.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    PassportModule,
    CommonModule,
    HelperModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [PassportModule, JwtStrategy, UserService],
})
export class UserModule {}
