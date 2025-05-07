import { Discount } from './discount.entity';
import { User } from './user.entity';
export declare class DiscountUser {
    id: number;
    discountId: number;
    userId: number;
    assignedAt: Date;
    discount: Discount;
    user: User;
}
