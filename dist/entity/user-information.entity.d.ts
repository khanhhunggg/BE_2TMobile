import { User } from './user.entity';
export declare class UserInformation {
    informationId: number;
    fullName: string;
    address: string;
    dateOfBirth: Date;
    gender: string;
    createdAt: Date;
    updatedAt: Date;
    users: User[];
}
