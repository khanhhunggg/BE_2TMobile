import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { HelperService } from 'src/common/helper/helper.service';
import {
  ChangePassWordDto,
  SignInDto,
  SignUpDto,
  UpdateProfileDto,
  UserJwtDto,
} from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { UserInformation } from 'src/entity/user-information.entity';
import {
  checkBirthDate,
  checkPassword,
  checkPhoneNumber,
} from 'src/util/funtion-util';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserInformation)
    private readonly userInformationRepository: Repository<UserInformation>,
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
  ) {}

  //Client API
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

  public async LogIn(user: SignInDto) {
    try {
      if (!user.PhoneNumber) {
        throw new BadRequestException('PHONE NUMBER IS REQUIRED');
      }
      const existingUser = await this.userRepository.findOne({
        where: { phoneNumber: user.PhoneNumber },
      });
      if (!existingUser) {
        throw new BadRequestException('PHONE NUMBER IS INCORRECT');
      }

      if (!user.Password) {
        throw new BadRequestException('PASSWORD_REQUIRED');
      }
      if (checkPassword(user.Password)) {
        throw new BadRequestException('PASSWORD_INVALID');
      }
      const isMatch = await bcryptjs.compare(
        user.Password,
        existingUser.password,
      );
      if (!isMatch) {
        throw new BadRequestException('PASSWORD_IS_INCORRECT');
      }
      return {
        ...(await this.encode(existingUser)),
        isAdmin: existingUser.isAdmin,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async LogOut(userReq: UserJwtDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: Number(userReq.id) },
      });
      if (user) {
        return { isLogin: false };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async ResetPassword(dto: ChangePassWordDto) {
    try {
      if (!isEmail(dto.Email)) {
        throw new BadRequestException('EMAIL_INVALID');
      }
      const user = await this.userRepository.findOne({
        where: { email: dto.Email },
      });
      if (!user) {
        throw new BadRequestException('EMAIL_NOT_FOUND');
      }
      if (!dto.OldPassWord) {
        throw new BadRequestException('OLD_PASSWORD_REQUIRED');
      }
      if (checkPassword(dto.OldPassWord)) {
        throw new BadRequestException('OLD_PASSWORD_INVALID');
      }
      const isMatch = await bcryptjs.compare(dto.OldPassWord, user.password);
      if (!isMatch) {
        throw new BadRequestException('OLD_PASSWORD_INCORRECT');
      }
      if (!dto.NewPassWord) {
        throw new BadRequestException('PASSWORD_REQUIRED');
      }
      if (checkPassword(dto.NewPassWord)) {
        throw new BadRequestException('PASSWORD_INVALID');
      }
      const salt = await bcryptjs.genSalt();
      user.password = await bcryptjs.hash(dto.NewPassWord, salt);
      return await this.userRepository.update(user.id, {
        password: user.password,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async UpdateProfile(dto: UpdateProfileDto, userReq: UserJwtDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: Number(userReq.id) },
        relations: ['userInformation'],
      });

      if (!user) {
        throw new BadRequestException('USER_NOT_FOUND');
      }

      if (dto.PhoneNumber) {
        if (checkPhoneNumber(dto.PhoneNumber)) {
          throw new BadRequestException('PHONE_NUMBER_INVALID');
        }
        user.phoneNumber = dto.PhoneNumber;
      }

      if (dto.FullName) {
        user.userName = dto.FullName;
      }

      let userInformation = user.userInformation;

      if (!userInformation) {
        userInformation = new UserInformation();
        user.informationId = null;
      }

      if (dto.Address) {
        userInformation.address = dto.Address;
      }

      if (dto.Gender) {
        userInformation.gender = dto.Gender;
      }

      if (dto.BirthDate) {
        if (checkBirthDate(dto.BirthDate)) {
          throw new BadRequestException('BIRTH_DATE_INVALID');
        }
        const formattedDate = moment(
          dto.BirthDate,
          ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD'],
          true,
        ).format('YYYY-MM-DD');
        userInformation.dateOfBirth = new Date(formattedDate);
      }

      const savedUserInformation =
        await this.userInformationRepository.save(userInformation);

      user.informationId = savedUserInformation.informationId;

      await this.userRepository.save(user);

      return {
        ...user,
        userInformation: savedUserInformation,
      };
    } catch (error) {
      throw new BadRequestException('ERROR_UPDATING_PROFILE');
    }
  }

  //Admin API

  private async encode(user: User) {
    try {
      const token = this.generateToken(user);
      const userInfor = await this.userRepository.findOne({
        where: { id: user.id },
      });
      return {
        token,
        ...userInfor,
      };
    } catch (error) {
      throw new BadRequestException('ERROR_ENCODING_USER');
    }
  }

  public generateToken(user: User, expiry?: string | number) {
    try {
      const payload: UserJwtDto = {
        userName: user.userName,
        id: user.id.toString(),
        isAdmin: user.isAdmin,
      };
      return this.jwtService.sign(payload, {
        expiresIn: expiry ? expiry : process.env.JWT_EXPIRES_IN,
      });
    } catch (error) {
      throw new BadRequestException('ERROR_GENERATING_TOKEN');
    }
  }

  public decode(token: string) {
    try {
      const jwt = token.replace('Bearer ', '');
      return this.jwtService.decode(jwt, { json: true }) as UserJwtDto;
    } catch (e) {
      return null;
    }
  }
}
