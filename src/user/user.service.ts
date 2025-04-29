import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { HelperService } from 'src/common/helper/helper.service';
import { SignUpDto } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { checkPassword } from 'src/util/funtion-util';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
  ) {}
  public async SignUp(user: SignUpDto) {
    try {
      if (!isEmail(user.Email)) {
        throw new BadRequestException('EMAIL_INVALID');
      }
      const existingUser = await this.userRepository.findOne({
        where: { email: user.Email },
      });
      if (existingUser) {
        throw new BadRequestException('EMAIL_ALREADY_EXISTS');
      }
      if (!user.Password) {
        throw new BadRequestException('PASSWORD_REQUIRED');
      }
      if (checkPassword(user.Password)) {
        throw new BadRequestException('PASSWORD_INVALID');
      }
      if (!user.PhoneNumber) {
        throw new BadRequestException('PHONE_NUMBER_REQUIRED');
      }
      const newUser = new User();
      newUser.email = user.Email;
      newUser.userName = '';
      const salt = await bcryptjs.genSalt();
      newUser.password = await bcryptjs.hash(user.Password, salt);
      newUser.phoneNumber = user.PhoneNumber;
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
