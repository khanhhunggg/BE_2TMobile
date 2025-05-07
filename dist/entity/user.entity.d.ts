import { UserInformation } from './user-information.entity';
import { Cart } from './cart.entity';
import { Review } from './review.entity';
export declare enum UserRank {
    Bronze = "Bronze",
    Silver = "Silver",
    Gold = "Gold",
    Platinum = "Platinum",
    Diamond = "Diamond"
}
export declare class User {
    id: number;
    informationId: number;
    userName: string;
    phoneNumber: string;
    email: string;
    password: string;
    isAdmin: boolean;
    userRank: UserRank;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    userInformation: UserInformation;
    carts: Cart[];
    reviews: Review[];
}
