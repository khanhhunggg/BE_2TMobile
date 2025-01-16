import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as sgMail from '@sendgrid/mail';
import * as bcryptjs from 'bcryptjs';
import { isEmail } from 'class-validator';
import { PaginationResponseDto, SearchDto } from 'src/common/common.dto';
import {
  GetUserByEmailDto,
  SendEmailForgotPasswordDto,
  SignInDto,
  SignUpDto,
  UserJwtDto,
} from 'src/database/dto/user/user.dto';
import { User } from 'src/database/entity/user.entity';
import { checkPassword } from 'src/util/funtion-util';
import { Like, Repository } from 'typeorm';
import { UserReq } from './../common/user.decorator';
import { HelperService } from 'src/common/helper/helper.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
    @Inject('SendGridToken') private readonly sendGridApiKey: string,
  ) {
    sgMail.setApiKey(this.sendGridApiKey);
  }

  //Main Function
  public async SignUp(user: SignUpDto) {
    try {
      if (!isEmail(user.Email)) {
        throw new BadRequestException('EMAIL_INVALID');
      }
      const existingUser = await this.userRepository.findOne({
        where: { Email: user.Email },
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
      if (!user.FullName) {
        throw new BadRequestException('FULLNAME_REQUIRED');
      }
      if (!user.PhoneNumber) {
        throw new BadRequestException('PHONE_NUMBER_REQUIRED');
      }
      const newUser = new User();
      newUser.Username = await this.GetUserName(user.FullName);
      newUser.Email = user.Email;
      const salt = await bcryptjs.genSalt();
      newUser.PasswordHash = await bcryptjs.hash(user.Password, salt);
      newUser.FullName = user.FullName;
      newUser.PhoneNumber = user.PhoneNumber;
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async LogIn(user: SignInDto) {
    try {
      if (!isEmail(user.Email)) {
        throw new BadRequestException('EMAIL_INVALID');
      }
      const existingUser = await this.userRepository.findOne({
        where: { Email: user.Email },
      });
      if (!existingUser) {
        throw new BadRequestException('EMAIL_IS_INCORRECT');
      }

      if (!user.Password) {
        throw new BadRequestException('PASSWORD_REQUIRED');
      }
      if (checkPassword(user.Password)) {
        throw new BadRequestException('PASSWORD_INVALID');
      }
      const isMatch = await bcryptjs.compare(
        user.Password,
        existingUser.PasswordHash,
      );
      if (!isMatch) {
        throw new BadRequestException('PASSWORD_IS_INCORRECT');
      }
      return {
        ...(await this.encode(existingUser)),
        isAdmin: existingUser.Role === 'Admin',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async LogOut(userReq: UserJwtDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { UserID: Number(userReq.id) },
      });
      if (user) {
        return { isLogin: false };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async ResetPassword(dto: SendEmailForgotPasswordDto) {
    try {
      if (!isEmail(dto.Email)) {
        throw new BadRequestException('EMAIL_INVALID');
      }
      const user = await this.userRepository.findOne({
        where: { Email: dto.Email },
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
      const isMatch = await bcryptjs.compare(
        dto.OldPassWord,
        user.PasswordHash,
      );
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
      user.PasswordHash = await bcryptjs.hash(dto.NewPassWord, salt);
      return await this.userRepository.update(user.UserID, {
        PasswordHash: user.PasswordHash,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  //Admin-GetAllUser
  public async getAll(
    dto: PaginationResponseDto,
    userReq: UserJwtDto,
  ): Promise<{ data: User[]; total: number }> {
    try {
      await this.helperService.validateAdmin(userReq);
      const { page, size } = dto;
      const [data, total] = await this.userRepository.findAndCount({
        skip: (page - 1) * size,
        take: size,
      });
      const getAll = {
        data,
        total,
        page,
        size,
      };
      return getAll;
    } catch (error) {
      throw new BadRequestException('ERROR_FETCHING_USERS');
    }
  }

  public async getUserByID(id: number, userReq: UserJwtDto) {
    try {
      if (!id) {
        throw new BadRequestException('ID_REQUIRED');
      }
      await this.helperService.validateAdmin(userReq);
      return await this.userRepository.findOne({ where: { UserID: id } });
    } catch (error) {
      throw new BadRequestException('ERROR_FETCHING_USER_BY_ID');
    }
  }

  public async getUserByKeyword(dto: SearchDto, userReq: UserJwtDto) {
    try {
      if (!dto.search) {
        throw new BadRequestException('NO_KEYWORD_FOUND');
      }
      const { search } = dto;
      await this.helperService.validateAdmin(userReq);
      const users = await this.userRepository.find({
        where: [
          { FullName: Like(`%${search}%`) },
          { Email: Like(`%${search}%`) },
          { PhoneNumber: Like(`%${search}%`) },
        ],
      });
      return users;
    } catch (error) {
      throw new BadRequestException('ERROR_FETCHING_USERS_BY_KEYWORD');
    }
  }

  //Support Function
  public generateToken(user: User, expiry?: string | number) {
    try {
      const payload: UserJwtDto = {
        userName: user.Username,
        id: user.UserID.toString(),
        isAdmin: user.Role === 'Admin',
      };
      return this.jwtService.sign(payload, {
        expiresIn: expiry ? expiry : process.env.JWT_EXPIRES_IN,
      });
    } catch (error) {
      throw new BadRequestException('ERROR_GENERATING_TOKEN');
    }
  }
  private async encode(user: User) {
    try {
      const token = this.generateToken(user);
      const userInfor = await this.userRepository.findOne({
        where: { UserID: user.UserID },
      });
      return {
        token,
        ...userInfor,
      };
    } catch (error) {
      throw new BadRequestException('ERROR_ENCODING_USER');
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
  public async GetUserName(fullName: string) {
    try {
      const parts = fullName.trim().split(/\s+/);
      if (parts.length > 1) {
        const lastName = parts.slice(-2).join(' ');
        return lastName
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
          .toLowerCase()
          .replace(/\s+/g, '');
      }
      return fullName.toLowerCase();
    } catch (error) {
      throw new BadRequestException('ERROR_GETTING_USER_NAME');
    }
  }
}
