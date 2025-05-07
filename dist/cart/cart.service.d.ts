import { CartDetail } from 'src/entity/cart-detail.entity';
import { Cart } from 'src/entity/cart.entity';
import { Repository } from 'typeorm';
import { CartItemDto, CreateCartDto, GetCartByUserDto, UpdateCartItemDto } from '../dto/cart.dto';
export declare class CartService {
    private readonly cartRepository;
    private readonly cartDetailRepository;
    constructor(cartRepository: Repository<Cart>, cartDetailRepository: Repository<CartDetail>);
    createCart(data: CreateCartDto): Promise<Cart>;
    addItemToCart(data: CartItemDto): Promise<CartDetail | {
        message: string;
    }>;
    updateCartItem(data: UpdateCartItemDto): Promise<CartDetail | {
        message: string;
    }>;
    removeItemFromCart(cartId: number, itemId: number): Promise<{
        message: string;
    }>;
    getCartByUserId(data: GetCartByUserDto): Promise<Cart | {
        message: string;
        cartDetails: any[];
    }>;
}
