import { JwtService } from '@nestjs/jwt';
import { HelperService } from 'src/common/helper/helper.service';
import { ChangePassWordDto, SignInDto, SignUpDto, UpdateDtoQuery, UpdateProfileDto, UpdateUserDto, UserJwtDto } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { UserInformation } from 'src/entity/user-information.entity';
import { Repository } from 'typeorm';
import { PaginationResponseDto, SearchDto } from 'src/common/common.dto';
import { VendorService } from '../vendor/vendor.service';
export declare class UserService {
    private readonly userRepository;
    private readonly userInformationRepository;
    private readonly vendorService;
    private readonly jwtService;
    private readonly helperService;
    constructor(userRepository: Repository<User>, userInformationRepository: Repository<UserInformation>, vendorService: VendorService, jwtService: JwtService, helperService: HelperService);
    SignUp(user: SignUpDto): Promise<User>;
    LogIn(user: SignInDto): Promise<{
        token: string;
        user: {
            id: number;
            informationId: number;
            userName: string;
            phoneNumber: string;
            email: string;
            isAdmin: boolean;
            userRank: import("src/entity/user.entity").UserRank;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    ResetPassword(dto: ChangePassWordDto): Promise<{
        message: string;
    }>;
    LogOut(data: UpdateDtoQuery): Promise<{
        isLogin: boolean;
    }>;
    UpdateProfile(dto: UpdateProfileDto): Promise<User>;
    updateUserById(dto: UpdateDtoQuery, updateDto: UpdateUserDto): Promise<User>;
    deleteUserById(id: number): Promise<{
        message: string;
    }>;
    deleteUserByIds(ids: number[]): Promise<{
        message: string;
    }>;
    getAll(dto: PaginationResponseDto): Promise<{
        data: User[];
        total: number;
        page: number;
        size: number;
    }>;
    getUserByID(id: UpdateDtoQuery): Promise<User>;
    getUserByKeyword(dto: SearchDto, paginationDto: PaginationResponseDto): Promise<{
        data: User[];
        total: number;
        page: number;
        size: number;
    }>;
    private encode;
    generateToken(user: User, expiry?: string | number): string;
    decode(token: string): UserJwtDto;
}
