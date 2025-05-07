import { User } from './user.entity';
import { CartDetail } from './cart-detail.entity';
export declare class Cart {
    id: number;
    user_id: number;
    user: User;
    cartDetails: CartDetail[];
    created_at: Date;
    updated_at: Date;
}
