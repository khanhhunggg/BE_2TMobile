import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as sgMail from '@sendgrid/mail';
import * as bcryptjs from 'bcryptjs';
import { isEmail } from 'class-validator';
import * as moment from 'moment';
import { PaginationResponseDto, SearchDto } from 'src/common/common.dto';
import { HelperService } from 'src/common/helper/helper.service';
import {
  ChangePassWordDto,
  DeleteUserDto,
  SignInDto,
  SignUpDto,
  UpdateDtoQuery,
  UpdateProfileDto,
  UpdateUserDto,
  UserJwtDto,
} from 'src/database/dto/user/user.dto';
import { Food } from 'src/database/entity/food/food.entity';
import { User } from 'src/database/entity/user.entity';
import {
  checkBirthDate,
  checkPassword,
  checkPhoneNumber,
} from 'src/util/funtion-util';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  //Khai báo.
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
    @Inject('SendGridToken') private readonly sendGridApiKey: string,
  ) {
    sgMail.setApiKey(this.sendGridApiKey);
  }
  //CRUD: Create Read Update Delete.

  //Main Function
  //Create
  public async SignUp(user: SignUpDto) {
    try {
      const newUser = new User(); // Tạo đối tượng User();

      newUser.Username = await this.GetUserName(user.FullName);
      newUser.Email = user.Email;
      const salt = await bcryptjs.genSalt();
      newUser.PasswordHash = await bcryptjs.hash(user.Password, salt);
      newUser.FullName = user.FullName;
      newUser.PhoneNumber = user.PhoneNumber;
      //Thêm dữ liệu cho người dùng mới.
      return await this.userRepository.save(newUser); // Lưu vào.
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async LogIn(user: SignInDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { Email: user.Email },
      });
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

  public async ResetPassword(dto: ChangePassWordDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { Email: dto.Email },
      });

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
  public async getAll(dto: PaginationResponseDto, userReq: UserJwtDto) {
    try {
      await this.helperService.validateAdmin(userReq);
      const { page, size } = dto;
      const query = this.userRepository //Custome Query
        .createQueryBuilder('user')
        .select([
          'user.UserID',
          'user.Username',
          'user.FullName',
          'user.Email',
          'user.PhoneNumber',
          'user.Address',
          'user.Gender',
          'user.BirthDate',
          'user.Role',
        ])
        .skip((page - 1) * size)
        .take(size);

      const [data, total] = await query.getManyAndCount();
      return { data, total, page, size };
    } catch (error) {
      throw new BadRequestException('ERROR_FETCHING_USERS');
    }
  }

  public async getUserByID(id: UpdateDtoQuery, userReq: UserJwtDto) {
    try {
      if (!id) {
        throw new BadRequestException('ID_REQUIRED');
      }
      await this.helperService.validateAdmin(userReq);
      const user = await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.UserID',
          'user.Username',
          'user.FullName',
          'user.Email',
          'user.PhoneNumber',
          'user.Address',
          'user.Gender',
          'user.BirthDate',
          'user.Role',
        ])
        .where('user.UserID = :id', { id: id.Id })
        .getOne();
      return user;
    } catch (error) {
      throw new BadRequestException('ERROR_FETCHING_USER_BY_ID');
    }
  }

  public async getUserByKeyword(
    dto: SearchDto,
    paginationDto: PaginationResponseDto,
    userReq: UserJwtDto,
  ) {
    try {
      if (!dto.search) {
        throw new BadRequestException('NO_KEYWORD_FOUND');
      }
      const { search } = dto;
      const { page, size } = paginationDto;
      await this.helperService.validateAdmin(userReq);

      const query = this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.UserID',
          'user.Username',
          'user.FullName',
          'user.Email',
          'user.PhoneNumber',
          'user.Address',
          'user.Gender',
          'user.BirthDate',
          'user.Role',
        ])
        .skip((page - 1) * size)
        .take(size)
        .where('user.FullName LIKE :search', { search: `%${search}%` })
        .orWhere('user.Email LIKE :search', { search: `%${search}%` })
        .orWhere('user.PhoneNumber LIKE :search', { search: `%${search}%` });

      const [data, total] = await query.getManyAndCount();
      return { data, total, page, size };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async updateProfile(dto: UpdateProfileDto, userReq: UserJwtDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { UserID: Number(userReq.id) },
      });
      if (!user) {
        throw new BadRequestException('USER_NOT_FOUND');
      }
      if (dto.PhoneNumber) {
        if (checkPhoneNumber(dto.PhoneNumber)) {
          throw new BadRequestException('PHONE_NUMBER_INVALID');
        }
      }
      if (dto.BirthDate) {
        if (checkBirthDate(dto.BirthDate)) {
          throw new BadRequestException('BIRTH_DATE_INVALID');
        }
      }
      const newUser = new User();
      newUser.FullName = dto?.FullName;
      newUser.PhoneNumber = dto?.PhoneNumber;
      newUser.Address = dto?.Address;
      newUser.Gender = dto?.Gender;
      const formattedDate = moment(
        dto.BirthDate,
        ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD'],
        true,
      ).format('YYYY-MM-DD');
      newUser.BirthDate = formattedDate;
      await this.userRepository.update(user.UserID, newUser);
      return newUser;
    } catch (error) {
      throw new BadRequestException('ERROR_UPDATING_PROFILE');
    }
  }
  public async updateUserById(
    dto: UpdateDtoQuery,
    updateDto: UpdateUserDto,
    userReq: UserJwtDto,
  ) {
    try {
      if (!dto.Id) {
        throw new BadRequestException('ID_REQUIRED');
      }
      await this.helperService.validateAdmin(userReq);
      return await this.userRepository.update(dto.Id, updateDto);
    } catch (error) {
      throw new BadRequestException('ERROR_UPDATING_USER_BY_ID');
    }
  }

  public async deleteUserById(dto: DeleteUserDto, userReq: UserJwtDto) {
    try {
      await this.helperService.validateAdmin(userReq);
      const user = await this.userRepository.findOne({
        where: { UserID: dto.Id },
      });
      if (user.Role === 'Admin') {
        throw new BadRequestException('ADMIN_CANNOT_BE_DELETED');
      }
      return await this.userRepository.delete({ UserID: dto.Id });
    } catch (error) {
      throw new BadRequestException('ERROR_DELETING_USER_BY_ID');
    }
  }

  public async deleteUserByIds(ids: number[], userReq: UserJwtDto) {
    try {
      await this.helperService.validateAdmin(userReq);
      for (let i = 0; i < ids.length; i++) {
        await this.userRepository.delete({ UserID: ids[i] });
      }
      return { message: 'USERS_DELETED_SUCCESSFULLY' };
    } catch (error) {
      throw new BadRequestException('ERROR_DELETING_USER_BY_ID');
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
