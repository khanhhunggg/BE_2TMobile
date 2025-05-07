import { PaginationResponseDto, SearchDto } from 'src/common/common.dto';
import { ChangePassWordDto, DeleteUserDto, SignInDto, SignUpDto, UpdateDtoQuery, UpdateProfileDto, UpdateUserDto } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    SignUp(user: SignUpDto): Promise<User>;
    Login(user: SignInDto): Promise<{
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
    LogOut(dto: UpdateDtoQuery): Promise<{
        isLogin: boolean;
    }>;
    ForgotPassword(dto: ChangePassWordDto): Promise<{
        message: string;
    }>;
    UpdateProfile(dto: UpdateProfileDto): Promise<User>;
    UpdateUserByID(dto: UpdateDtoQuery, updateDto: UpdateUserDto): Promise<User>;
    DeleteUserById(dto: DeleteUserDto): Promise<{
        message: string;
    }>;
    DeleteUserByIds(ids: number[]): Promise<{
        message: string;
    }>;
    GetUserByEmail(dto: PaginationResponseDto): Promise<{
        data: User[];
        total: number;
    }>;
    GetUserByID(id: UpdateDtoQuery): Promise<User>;
    GetUserByKeyword(dto: SearchDto, paginationDto: PaginationResponseDto): Promise<{
        data: User[];
        total: number;
        page: number;
        size: number;
    }>;
}
