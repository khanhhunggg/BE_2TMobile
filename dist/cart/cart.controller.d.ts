import { CartItemDto, DeleteCartItemDto, GetCartByUserDto, UpdateCartItemDto } from '../dto/cart.dto';
import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    GetCartByUser(data: GetCartByUserDto): Promise<import("../entity/cart.entity").Cart | {
        message: string;
        cartDetails: any[];
    }>;
    AddItemToCart(data: CartItemDto): Promise<import("../entity/cart-detail.entity").CartDetail | {
        message: string;
    }>;
    UpdateCartItem(data: UpdateCartItemDto): Promise<import("../entity/cart-detail.entity").CartDetail | {
        message: string;
    }>;
    DeleteCartItem(data: DeleteCartItemDto): Promise<{
        message: string;
    }>;
}
