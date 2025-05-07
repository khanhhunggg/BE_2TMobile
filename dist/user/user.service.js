"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const helper_service_1 = require("../common/helper/helper.service");
const user_entity_1 = require("../entity/user.entity");
const user_information_entity_1 = require("../entity/user-information.entity");
const funtion_util_1 = require("../util/funtion-util");
const typeorm_2 = require("typeorm");
const bcryptjs = require("bcryptjs");
const moment = require("moment");
const vendor_service_1 = require("../vendor/vendor.service");
let UserService = class UserService {
    constructor(userRepository, userInformationRepository, vendorService, jwtService, helperService) {
        this.userRepository = userRepository;
        this.userInformationRepository = userInformationRepository;
        this.vendorService = vendorService;
        this.jwtService = jwtService;
        this.helperService = helperService;
    }
    async SignUp(user) {
        try {
            if (!(0, class_validator_1.isEmail)(user.Email)) {
                throw new common_1.BadRequestException('EMAIL_INVALID');
            }
            console.log(user);
            const existingUser = await this.userRepository.findOne({
                where: { email: user.Email },
            });
            if (existingUser) {
                throw new common_1.BadRequestException('EMAIL_ALREADY_EXISTS');
            }
            if (!user.Password) {
                throw new common_1.BadRequestException('PASSWORD_REQUIRED');
            }
            if (!user.PhoneNumber) {
                throw new common_1.BadRequestException('PHONE_NUMBER_REQUIRED');
            }
            const newUser = new user_entity_1.User();
            newUser.email = user.Email;
            const salt = await bcryptjs.genSalt();
            newUser.password = await bcryptjs.hash(user.Password, salt);
            newUser.phoneNumber = user.PhoneNumber;
            return await this.userRepository.save(newUser);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async LogIn(user) {
        try {
            if (!user.PhoneNumber) {
                throw new common_1.BadRequestException('PHONE NUMBER IS REQUIRED');
            }
            const existingUser = await this.userRepository.findOne({
                where: { phoneNumber: user.PhoneNumber },
            });
            if (!existingUser) {
                throw new common_1.BadRequestException('PHONE NUMBER IS INCORRECT');
            }
            if (!user.Password) {
                throw new common_1.BadRequestException('PASSWORD_REQUIRED');
            }
            const isMatch = await bcryptjs.compare(user.Password, existingUser.password);
            if (!isMatch) {
                throw new common_1.BadRequestException('PASSWORD_IS_INCORRECT');
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
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async ResetPassword(dto) {
        try {
            const user = await this.userRepository.findOne({
                where: { phoneNumber: dto.PhoneNumber },
            });
            if (!user) {
                throw new common_1.BadRequestException('USER_NOT_FOUND');
            }
            if (!dto.OldPassWord) {
                throw new common_1.BadRequestException('OLD_PASSWORD_REQUIRED');
            }
            const isMatch = await bcryptjs.compare(dto.OldPassWord, user.password);
            if (!isMatch) {
                throw new common_1.BadRequestException('OLD_PASSWORD_INCORRECT');
            }
            if (!dto.NewPassWord) {
                throw new common_1.BadRequestException('PASSWORD_REQUIRED');
            }
            const salt = await bcryptjs.genSalt();
            user.password = await bcryptjs.hash(dto.NewPassWord, salt);
            await this.userRepository.update(user.id, {
                password: user.password,
            });
            return { message: 'PASSWORD_CHANGED_SUCCESSFULLY' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async LogOut(data) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: data.id },
            });
            if (user) {
                return { isLogin: false };
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async UpdateProfile(dto) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: Number(dto.id) },
                relations: ['userInformation'],
            });
            if (!user) {
                throw new common_1.BadRequestException('USER_NOT_FOUND');
            }
            if (dto.PhoneNumber) {
                if ((0, funtion_util_1.checkPhoneNumber)(dto.PhoneNumber)) {
                    throw new common_1.BadRequestException('PHONE_NUMBER_INVALID');
                }
                user.phoneNumber = dto.PhoneNumber;
            }
            if (dto.FullName) {
                user.userName = dto.FullName;
            }
            let userInformation = user.userInformation;
            if (!userInformation) {
                userInformation = new user_information_entity_1.UserInformation();
                userInformation.fullName = dto.FullName || user.userName;
                userInformation.address = dto.Address || '';
                userInformation.gender = dto.Gender;
                if (dto.BirthDate) {
                    if ((0, funtion_util_1.checkBirthDate)(dto.BirthDate)) {
                        throw new common_1.BadRequestException('BIRTH_DATE_INVALID');
                    }
                    const formattedDate = moment(dto.BirthDate, ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD'], true).format('YYYY-MM-DD');
                    userInformation.dateOfBirth = new Date(formattedDate);
                }
                const savedUserInformation = await this.userInformationRepository.save(userInformation);
                user.informationId = savedUserInformation.informationId;
                user.userInformation = savedUserInformation;
            }
            else {
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
                    if ((0, funtion_util_1.checkBirthDate)(dto.BirthDate)) {
                        throw new common_1.BadRequestException('BIRTH_DATE_INVALID');
                    }
                    const formattedDate = moment(dto.BirthDate, ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD'], true).format('YYYY-MM-DD');
                    userInformation.dateOfBirth = new Date(formattedDate);
                }
                await this.userInformationRepository.save(userInformation);
            }
            await this.userRepository.save(user);
            const updatedUser = await this.userRepository.findOne({
                where: { id: Number(dto.id) },
                relations: ['userInformation'],
            });
            return updatedUser;
        }
        catch (error) {
            console.error('Error in UpdateProfile:', error);
            throw new common_1.BadRequestException('ERROR_UPDATING_PROFILE');
        }
    }
    async updateUserById(dto, updateDto) {
        try {
            if (!dto.id) {
                throw new common_1.BadRequestException('ID_REQUIRED');
            }
            const user = await this.userRepository.findOne({
                where: { id: dto.id },
                relations: ['userInformation'],
            });
            if (!user) {
                throw new common_1.BadRequestException('USER_NOT_FOUND');
            }
            const userUpdateData = {};
            if (updateDto.Username !== undefined &&
                updateDto.Username !== user.userName) {
                userUpdateData.userName = updateDto.Username;
            }
            if (updateDto.PhoneNumber !== undefined &&
                updateDto.PhoneNumber !== user.phoneNumber) {
                userUpdateData.phoneNumber = updateDto.PhoneNumber;
            }
            if (updateDto.Email !== undefined && updateDto.Email !== user.email) {
                userUpdateData.email = updateDto.Email;
            }
            let userInformation = user.userInformation;
            let userInformationUpdateData = {};
            if (updateDto.FullName !== undefined ||
                updateDto.Address !== undefined ||
                updateDto.Gender !== undefined ||
                updateDto.BirthDate !== undefined) {
                if (!userInformation) {
                    userInformation = new user_information_entity_1.UserInformation();
                    userInformationUpdateData = {
                        fullName: updateDto.FullName || '',
                        address: updateDto.Address || '',
                        gender: updateDto.Gender,
                        dateOfBirth: updateDto.BirthDate
                            ? new Date(updateDto.BirthDate)
                            : null,
                    };
                }
                else {
                    if (updateDto.FullName !== undefined &&
                        updateDto.FullName !== userInformation.fullName) {
                        userInformationUpdateData.fullName = updateDto.FullName;
                    }
                    if (updateDto.Address !== undefined &&
                        updateDto.Address !== userInformation.address) {
                        userInformationUpdateData.address = updateDto.Address;
                    }
                    if (updateDto.Gender !== undefined &&
                        updateDto.Gender !== userInformation.gender) {
                        userInformationUpdateData.gender = updateDto.Gender;
                    }
                    if (updateDto.BirthDate !== undefined) {
                        const newBirthDate = new Date(updateDto.BirthDate);
                        if (newBirthDate.getTime() !== userInformation.dateOfBirth?.getTime()) {
                            userInformationUpdateData.dateOfBirth = newBirthDate;
                        }
                    }
                }
                if (Object.keys(userInformationUpdateData).length > 0) {
                    const savedUserInformation = await this.userInformationRepository.save({
                        ...userInformation,
                        ...userInformationUpdateData,
                    });
                    userUpdateData.informationId = savedUserInformation.informationId;
                }
            }
            if (Object.keys(userUpdateData).length > 0) {
                await this.userRepository.update(dto.id, userUpdateData);
            }
            const updatedUser = await this.userRepository.findOne({
                where: { id: dto.id },
                relations: ['userInformation'],
            });
            return updatedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException('ERROR_UPDATING_USER_BY_ID');
        }
    }
    async deleteUserById(id) {
        try {
            if (!id) {
                throw new common_1.BadRequestException('ID_REQUIRED');
            }
            const user = await this.userRepository.findOne({
                where: { id: id },
            });
            if (!user) {
                throw new common_1.BadRequestException('USER_NOT_FOUND');
            }
            if (user.isAdmin) {
                throw new common_1.BadRequestException('ADMIN_CANNOT_BE_DELETED');
            }
            if (user.informationId) {
                await this.userInformationRepository.delete(user.informationId);
            }
            await this.userRepository.delete(id);
            return { message: 'USER_DELETED_SUCCESSFULLY' };
        }
        catch (error) {
            console.error('Error in deleteUserById:', error);
            throw new common_1.BadRequestException('ERROR_DELETING_USER_BY_ID');
        }
    }
    async deleteUserByIds(ids) {
        try {
            for (let i = 0; i < ids.length; i++) {
                await this.userRepository.delete({ id: ids[i] });
            }
            return { message: 'USERS_DELETED_SUCCESSFULLY' };
        }
        catch (error) {
            throw new common_1.BadRequestException('ERROR_DELETING_USER_BY_ID');
        }
    }
    async getAll(dto) {
        try {
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
        }
        catch (error) {
            console.error('Error in getAll:', error);
            throw new common_1.BadRequestException('ERROR_FETCHING_USERS');
        }
    }
    async getUserByID(id) {
        try {
            if (!id) {
                throw new common_1.BadRequestException('ID_REQUIRED');
            }
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
                .where('user.id = :id', { id: id.id })
                .getOne();
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException('ERROR_FETCHING_USER_BY_ID');
        }
    }
    async getUserByKeyword(dto, paginationDto) {
        try {
            const { keyword } = dto;
            const { page = 1, size = 10 } = paginationDto;
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
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async encode(user) {
        try {
            const token = this.generateToken(user);
            const userInfor = await this.userRepository.findOne({
                where: { id: user.id },
            });
            return {
                token,
                ...userInfor,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('ERROR_ENCODING_USER');
        }
    }
    generateToken(user, expiry) {
        try {
            const payload = {
                userName: user.userName,
                id: user.id.toString(),
                isAdmin: user.isAdmin,
            };
            return this.jwtService.sign(payload, {
                expiresIn: expiry ? expiry : process.env.JWT_EXPIRES_IN,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('ERROR_GENERATING_TOKEN');
        }
    }
    decode(token) {
        try {
            const jwt = token.replace('Bearer ', '');
            return this.jwtService.decode(jwt, { json: true });
        }
        catch (e) {
            return null;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_information_entity_1.UserInformation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        vendor_service_1.VendorService,
        jwt_1.JwtService,
        helper_service_1.HelperService])
], UserService);
//# sourceMappingURL=user.service.js.map