import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { SignUpDto, UserJwtDto } from 'src/database/dto/auth/auth.dto';
import { User } from 'src/database/entity/user.entity';
import { checkPassword, checkPhoneNumber } from 'src/util/funtion-util';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  private async verifyEmail(email: string) {
    if (!email && !isEmail(email)) {
      throw new BadRequestException('EMAIL_INVALID');
    }

    if (email) {
      const existingUser = await this.userRepository.findOne({
        where: { Email: email },
      });
      if (existingUser) {
        throw new BadRequestException('EMAIL_ALREADY_EXISTS');
      }
    }
    return true;
  }
  public generateToken(user: User, expiry?: string | number) {
    const payload: UserJwtDto = {
      userName: user.Username,
      id: user.UserID.toString(),
      isAdmin: user.Role === 'Admin',
    };
    return this.jwtService.sign(payload, {
      expiresIn: expiry ? expiry : process.env.JWT_EXPIRES_IN,
    });
  }
  private async encode(user: User) {
    const token = this.generateToken(user);
    const userInfor = await this.userRepository.findOne({
      where: { UserID: user.UserID },
    });
    return {
      token,
      ...userInfor,
    };
  }
  public decode(token: string) {
    try {
      const jwt = token.replace('Bearer ', '');
      return this.jwtService.decode(jwt, { json: true }) as UserJwtDto;
    } catch (e) {
      return null;
    }
  }
  public async SignUp(user: SignUpDto) {
    try {
      await this.verifyEmail(user.Email);
      if (!user.Password) {
        throw new BadRequestException('PASSWORD_REQUIRED');
      }
      if (checkPassword(user.Password)) {
        throw new BadRequestException('PASSWORD_INVALID');
      }
      if (!user.FullName) {
        throw new BadRequestException('FULLNAME_REQUIRED');
      }
      if (!user.PhoneNumber) {
        throw new BadRequestException('PHONE_NUMBER_REQUIRED');
      }
      if (checkPhoneNumber(user.PhoneNumber)) {
        throw new BadRequestException('PHONE_NUMBER_INVALID');
      }
      const newUser = new User();
      newUser.Email = user.Email;
      newUser.PasswordHash = user.Password;
      newUser.FullName = user.FullName;
      newUser.PhoneNumber = user.PhoneNumber;

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
