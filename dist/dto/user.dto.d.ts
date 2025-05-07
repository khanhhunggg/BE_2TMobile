import { PaginationResponseDto } from 'src/common/common.dto';
export declare class UserJwtDto {
    id: string;
    userName: string;
    isAdmin: boolean;
    fcmToken?: string;
}
export declare class SignUpDto {
    Email: string;
    Password: string;
    PhoneNumber: string;
}
export declare class SignInDto {
    PhoneNumber: string;
    Password: string;
}
export declare class ChangePassWordDto {
    PhoneNumber: string;
    OldPassWord: string;
    NewPassWord: string;
}
export declare class GetUserByEmailDto extends PaginationResponseDto {
    Email: string;
}
export declare class CreateUserDto {
    Username: string;
    FullName?: string;
    Email?: string;
    PhoneNumber?: string;
    Address?: string;
    Role?: 'Admin' | 'Customer';
    Gender?: 'Male' | 'Female' | 'Other';
    BirthDate?: string;
}
export declare class UpdateUserDto extends CreateUserDto {
}
export declare class UpdateDtoQuery {
    id: number;
}
export declare class UpdateProfileDto {
    id: number;
    FullName?: string;
    PhoneNumber?: string;
    Address?: string;
    Gender?: 'Male' | 'Female' | 'Other';
    BirthDate?: string;
}
export declare class DeleteUserDto {
    Id: number;
}
