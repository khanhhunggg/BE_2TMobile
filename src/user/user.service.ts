import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
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
import { PaginationResponseDto, SearchDto } from 'src/common/common.dto';
import { VendorService } from '../vendor/vendor.service';
import { In } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserInformation)
    private readonly userInformationRepository: Repository<UserInformation>,
    private readonly vendorService: VendorService,
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
  ) {}

  //Client API
  public async SignUp(user: SignUpDto) {
    try {
      if (!isEmail(user.Email)) {
        throw new BadRequestException('EMAIL_INVALID');
      }
      console.log(user);
      const existingUser = await this.userRepository.findOne({
        where: { email: user.Email, phoneNumber: user.PhoneNumber },
      });
      if (existingUser) {
        throw new BadRequestException('EMAIL_OR_PHONE_NUMBER_ALREADY_EXISTS');
      }
      if (!user.Password) {
        throw new BadRequestException('PASSWORD_REQUIRED');
      }
      // if (checkPassword(user.Password)) {
      //   throw new BadRequestException('PASSWORD_INVALID');
      // }
      if (!user.PhoneNumber) {
        throw new BadRequestException('PHONE_NUMBER_REQUIRED');
      }
      const newUser = new User();
      newUser.email = user.Email;
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
      // if (checkPassword(user.Password)) {
      //   throw new BadRequestException('PASSWORD_INVALID');
      // }
      const isMatch = await bcryptjs.compare(
        user.Password,
        existingUser.password,
      );
      if (!isMatch) {
        throw new BadRequestException('PASSWORD_IS_INCORRECT');
      }

      const token = this.generateToken(existingUser);
      return {
        token,
        user: {
          id: existingUser.id,
          informationId: existingUser.informationId,
          userName: existingUser.userName,
          phoneNumber: existingUser.phoneNumber,
          email: existingUser.email,
          isAdmin: existingUser.isAdmin,
          userRank: existingUser.userRank,
          isActive: existingUser.isActive,
          createdAt: existingUser.createdAt,
          updatedAt: existingUser.updatedAt,
        },
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  public async ResetPassword(dto: ChangePassWordDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { phoneNumber: dto.PhoneNumber },
      });
      if (!user) {
        throw new BadRequestException('USER_NOT_FOUND');
      }
      if (!dto.OldPassWord) {
        throw new BadRequestException('OLD_PASSWORD_REQUIRED');
      }
      const isMatch = await bcryptjs.compare(dto.OldPassWord, user.password);
      if (!isMatch) {
        throw new BadRequestException('OLD_PASSWORD_INCORRECT');
      }
      if (!dto.NewPassWord) {
        throw new BadRequestException('PASSWORD_REQUIRED');
      }
      const salt = await bcryptjs.genSalt();
      user.password = await bcryptjs.hash(dto.NewPassWord, salt);
      await this.userRepository.update(user.id, {
        password: user.password,
      });
      return { message: 'PASSWORD_CHANGED_SUCCESSFULLY' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async LogOut(data: UpdateDtoQuery) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: Number(data.id) },
      });
      if (user) {
        return { isLogin: false };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async UpdateProfile(dto: UpdateProfileDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: Number(dto.id) },
        relations: ['userInformation'],
      });

      if (!user) {
        throw new BadRequestException('USER_NOT_FOUND');
      }

      // Update user basic information
      if (dto.PhoneNumber) {
        if (checkPhoneNumber(dto.PhoneNumber)) {
          throw new BadRequestException('PHONE_NUMBER_INVALID');
        }
        user.phoneNumber = dto.PhoneNumber;
      }

      if (dto.FullName) {
        user.userName = dto.FullName;
      }

      // Handle user information
      let userInformation = user.userInformation;

      if (!userInformation) {
        // Create new user information if not exists
        userInformation = new UserInformation();
        userInformation.fullName = dto.FullName || user.userName;
        userInformation.address = dto.Address || '';
        userInformation.gender = dto.Gender;

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

        // Save new user information
        const savedUserInformation =
          await this.userInformationRepository.save(userInformation);
        user.informationId = savedUserInformation.informationId;
        user.userInformation = savedUserInformation;
      } else {
        // Update existing user information
        if (dto.FullName) {
          userInformation.fullName = dto.FullName;
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

        // Save updated user information
        await this.userInformationRepository.save(userInformation);
      }

      // Save user with updated information
      await this.userRepository.save(user);

      // Return updated user with information
      const updatedUser = await this.userRepository.findOne({
        where: { id: Number(dto.id) },
        relations: ['userInformation'],
      });

      return updatedUser;
    } catch (error) {
      console.error('Error in UpdateProfile:', error);
      throw new BadRequestException('ERROR_UPDATING_PROFILE');
    }
  }

  public async updateUserById(dto: UpdateDtoQuery, updateDto: UpdateUserDto) {
    try {
      if (!dto.id) {
        throw new BadRequestException('ID_REQUIRED');
      }

      const user = await this.userRepository.findOne({
        where: { id: Number(dto.id) },
        relations: ['userInformation'],
      });

      if (!user) {
        throw new BadRequestException('USER_NOT_FOUND');
      }

      const userUpdateData: Partial<User> = {};

      // Only update fields that have changed
      if (
        updateDto.Username !== undefined &&
        updateDto.Username !== user.userName
      ) {
        userUpdateData.userName = updateDto.Username;
      }

      if (
        updateDto.PhoneNumber !== undefined &&
        updateDto.PhoneNumber !== user.phoneNumber
      ) {
        userUpdateData.phoneNumber = updateDto.PhoneNumber;
      }

      if (updateDto.Email !== undefined && updateDto.Email !== user.email) {
        userUpdateData.email = updateDto.Email;
      }

      let userInformation = user.userInformation;
      let userInformationUpdateData: Partial<UserInformation> = {};

      if (
        updateDto.FullName !== undefined ||
        updateDto.Address !== undefined ||
        updateDto.Gender !== undefined ||
        updateDto.BirthDate !== undefined
      ) {
        if (!userInformation) {
          userInformation = new UserInformation();
          userInformationUpdateData = {
            fullName: updateDto.FullName || '',
            address: updateDto.Address || '',
            gender: updateDto.Gender,
            dateOfBirth: updateDto.BirthDate
              ? new Date(updateDto.BirthDate)
              : null,
          };
        } else {
          // Only update fields that have changed
          if (
            updateDto.FullName !== undefined &&
            updateDto.FullName !== userInformation.fullName
          ) {
            userInformationUpdateData.fullName = updateDto.FullName;
          }

          if (
            updateDto.Address !== undefined &&
            updateDto.Address !== userInformation.address
          ) {
            userInformationUpdateData.address = updateDto.Address;
          }

          if (
            updateDto.Gender !== undefined &&
            updateDto.Gender !== userInformation.gender
          ) {
            userInformationUpdateData.gender = updateDto.Gender;
          }

          if (updateDto.BirthDate !== undefined) {
            const newBirthDate = new Date(updateDto.BirthDate);
            if (
              newBirthDate.getTime() !== userInformation.dateOfBirth?.getTime()
            ) {
              userInformationUpdateData.dateOfBirth = newBirthDate;
            }
          }
        }

        // Only save if there are changes
        if (Object.keys(userInformationUpdateData).length > 0) {
          const savedUserInformation =
            await this.userInformationRepository.save({
              ...userInformation,
              ...userInformationUpdateData,
            });

          userUpdateData.informationId = savedUserInformation.informationId;
        }
      }

      // Only update user if there are changes
      if (Object.keys(userUpdateData).length > 0) {
        await this.userRepository.update(dto.id, userUpdateData);
      }

      const updatedUser = await this.userRepository.findOne({
        where: { id: Number(dto.id) },
        relations: ['userInformation'],
      });

      return updatedUser;
    } catch (error) {
      throw new BadRequestException('ERROR_UPDATING_USER_BY_ID');
    }
  }

  public async deleteUserById(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('ID_REQUIRED');
      }

      const user = await this.userRepository.findOne({
        where: { id: Number(id) },
        relations: ['carts', 'reviews', 'userInformation'],
      });

      if (!user) {
        throw new BadRequestException('USER_NOT_FOUND');
      }

      if (user.isAdmin) {
        throw new BadRequestException('ADMIN_CANNOT_BE_DELETED');
      }

      // Delete user's cart details first
      if (user.carts && user.carts.length > 0) {
        for (const cart of user.carts) {
          await this.userRepository.query(
            'DELETE FROM tbl_cart_details WHERE cart_id = ?',
            [cart.id],
          );
        }
        // Delete user's carts
        await this.userRepository.query(
          'DELETE FROM tbl_carts WHERE user_id = ?',
          [id],
        );
      }

      // Delete user's reviews
      if (user.reviews && user.reviews.length > 0) {
        await this.userRepository.query(
          'DELETE FROM tbl_reviews WHERE user_id = ?',
          [id],
        );
      }

      // Delete user's discount associations
      await this.userRepository.query(
        'DELETE FROM tbl_discount_users WHERE user_id = ?',
        [id],
      );

      // Delete user's orders and related data
      const orders = await this.userRepository.query(
        'SELECT id FROM tbl_order WHERE user_id = ?',
        [id],
      );

      if (orders && orders.length > 0) {
        for (const order of orders) {
          // Delete order details
          await this.userRepository.query(
            'DELETE FROM tbl_order_details WHERE order_id = ?',
            [order.id],
          );
          // Delete payments
          await this.userRepository.query(
            'DELETE FROM tbl_payment WHERE order_id = ?',
            [order.id],
          );
        }
        // Delete orders
        await this.userRepository.query(
          'DELETE FROM tbl_order WHERE user_id = ?',
          [id],
        );
      }

      // Delete user's returns and related data
      const returns = await this.userRepository.query(
        'SELECT id FROM tbl_returns WHERE customer_id = ?',
        [id],
      );

      if (returns && returns.length > 0) {
        for (const returnItem of returns) {
          // Delete return details
          await this.userRepository.query(
            'DELETE FROM tbl_return_details WHERE return_id = ?',
            [returnItem.id],
          );
        }
        // Delete returns
        await this.userRepository.query(
          'DELETE FROM tbl_returns WHERE customer_id = ?',
          [id],
        );
      }

      // Delete user information if exists
      if (user.informationId) {
        await this.userInformationRepository.delete(user.informationId);
      }

      // Finally delete the user
      await this.userRepository.delete(Number(id));

      return { message: 'USER_DELETED_SUCCESSFULLY' };
    } catch (error) {
      console.error('Error in deleteUserById:', error);
      throw new BadRequestException('ERROR_DELETING_USER_BY_ID');
    }
  }

  public async deleteUserByIds(ids: number[]) {
    try {
      if (!ids || ids.length === 0) {
        throw new BadRequestException('IDS_REQUIRED');
      }

      // Get all users with their relations
      const users = await this.userRepository.find({
        where: { id: In(ids) },
        relations: ['carts', 'reviews', 'userInformation'],
      });

      if (!users || users.length === 0) {
        throw new BadRequestException('USERS_NOT_FOUND');
      }

      // Check if any user is admin
      const adminUser = users.find((user) => user.isAdmin);
      if (adminUser) {
        throw new BadRequestException('ADMIN_CANNOT_BE_DELETED');
      }

      // Delete cart details and carts for all users
      for (const user of users) {
        if (user.carts && user.carts.length > 0) {
          for (const cart of user.carts) {
            await this.userRepository.query(
              'DELETE FROM tbl_cart_details WHERE cart_id = ?',
              [cart.id],
            );
          }
        }
      }
      await this.userRepository.query(
        'DELETE FROM tbl_carts WHERE user_id IN (?)',
        [ids],
      );

      // Delete reviews for all users
      await this.userRepository.query(
        'DELETE FROM tbl_reviews WHERE user_id IN (?)',
        [ids],
      );

      // Delete discount associations for all users
      await this.userRepository.query(
        'DELETE FROM tbl_discount_users WHERE user_id IN (?)',
        [ids],
      );

      // Get all orders for these users
      const orders = await this.userRepository.query(
        'SELECT id FROM tbl_order WHERE user_id IN (?)',
        [ids],
      );

      if (orders && orders.length > 0) {
        const orderIds = orders.map((order) => order.id);
        // Delete order details
        await this.userRepository.query(
          'DELETE FROM tbl_order_details WHERE order_id IN (?)',
          [orderIds],
        );
        // Delete payments
        await this.userRepository.query(
          'DELETE FROM tbl_payment WHERE order_id IN (?)',
          [orderIds],
        );
        // Delete orders
        await this.userRepository.query(
          'DELETE FROM tbl_order WHERE user_id IN (?)',
          [ids],
        );
      }

      // Get all returns for these users
      const returns = await this.userRepository.query(
        'SELECT id FROM tbl_returns WHERE customer_id IN (?)',
        [ids],
      );

      if (returns && returns.length > 0) {
        const returnIds = returns.map((returnItem) => returnItem.id);
        // Delete return details
        await this.userRepository.query(
          'DELETE FROM tbl_return_details WHERE return_id IN (?)',
          [returnIds],
        );
        // Delete returns
        await this.userRepository.query(
          'DELETE FROM tbl_returns WHERE customer_id IN (?)',
          [ids],
        );
      }

      // Delete user information for all users
      const informationIds = users
        .filter((user) => user.informationId)
        .map((user) => user.informationId);

      if (informationIds.length > 0) {
        await this.userInformationRepository.delete(informationIds);
      }

      // Finally delete the users
      await this.userRepository.delete(ids);

      return { message: 'USERS_DELETED_SUCCESSFULLY' };
    } catch (error) {
      console.error('Error in deleteUserByIds:', error);
      throw new BadRequestException('ERROR_DELETING_USERS');
    }
  }

  //Admin API

  public async getAll(dto: PaginationResponseDto) {
    try {
      // await this.helperService.validateAdmin(userReq);
      const page = dto.page || 1;
      const size = dto.size || 10;

      const query = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userInformation', 'userInformation')
        .select([
          'user.id',
          'user.userName',
          'user.phoneNumber',
          'user.email',
          'user.isAdmin',
          'user.userRank',
          'user.isActive',
          'user.createdAt',
          'userInformation.informationId',
          'userInformation.fullName',
          'userInformation.address',
          'userInformation.gender',
          'userInformation.birthday',
          'userInformation.avatar',
        ])
        .skip((page - 1) * size)
        .take(size);

      const [data, total] = await query.getManyAndCount();
      return { data, total, page, size };
    } catch (error) {
      console.error('Error in getAll:', error);
      throw new BadRequestException('ERROR_FETCHING_USERS');
    }
  }

  public async getUserByID(id: UpdateDtoQuery) {
    try {
      if (!id) {
        throw new BadRequestException('ID_REQUIRED');
      }
      // await this.helperService.validateAdmin(userReq);
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userInformation', 'userInformation')
        .select([
          'user.id',
          'user.userName',
          'user.phoneNumber',
          'user.email',
          'user.isAdmin',
          'user.userRank',
          'user.isActive',
          'user.createdAt',
          'user.updatedAt',
          'userInformation.informationId',
          'userInformation.fullName',
          'userInformation.address',
          'userInformation.gender',
          'userInformation.birthday',
          'userInformation.avatar',
          'userInformation.createdAt',
          'userInformation.updatedAt',
        ])
        .where('user.id = :id', { id: Number(id.id) })
        .getOne();
      return user;
    } catch (error) {
      throw new BadRequestException('ERROR_FETCHING_USER_BY_ID');
    }
  }

  public async getUserByKeyword(
    dto: SearchDto,
    paginationDto: PaginationResponseDto,
  ) {
    try {
      const { keyword } = dto;
      const { page = 1, size = 10 } = paginationDto;
      // await this.helperService.validateAdmin(userReq);

      const query = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userInformation', 'userInformation')
        .select([
          'user.id',
          'user.userName',
          'user.phoneNumber',
          'user.email',
          'user.isAdmin',
          'user.userRank',
          'user.isActive',
          'user.createdAt',
          'user.updatedAt',
          'userInformation.informationId',
          'userInformation.fullName',
          'userInformation.address',
          'userInformation.gender',
          'userInformation.birthday',
          'userInformation.avatar',
          'userInformation.createdAt',
          'userInformation.updatedAt',
        ])
        .skip((page - 1) * size)
        .take(size);

      if (keyword) {
        query
          .where('user.userName LIKE :keyword', { keyword: `%${keyword}%` })
          .orWhere('user.email LIKE :keyword', { keyword: `%${keyword}%` })
          .orWhere('user.phoneNumber LIKE :keyword', {
            keyword: `%${keyword}%`,
          })
          .orWhere('userInformation.fullName LIKE :keyword', {
            keyword: `%${keyword}%`,
          });
      }

      const [data, total] = await query.getManyAndCount();
      return { data, total, page, size };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

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
