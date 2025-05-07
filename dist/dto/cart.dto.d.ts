export declare class CreateCartDto {
    user_id: number;
}
export declare class CreateCartItemDto {
    user_id: number;
}
export declare class CartItemDto {
    user_id: number;
    product_detail_id: number;
    quantity: number;
    price?: string;
}
export declare class GetCartByUserDto {
    user_id: number;
}
export declare class UpdateCartItemDto {
    cart_id: number;
    item_id: number;
    quantity?: number;
    price?: string;
}
export declare class DeleteCartItemDto {
    cart_id: number;
    item_id: number;
}
export declare class UpdateCartDetailDto {
    quantity?: number;
    price?: string;
}
export declare class CartItemResponseDto {
    id: number;
    cart_id: number;
    product_detail_id: number;
    quantity: number;
    price: string;
    created_at: Date;
    product?: {
        id: number;
        name: string;
        model: string;
        description: string;
        warranty_period: number;
        release_year: number;
        is_featured: boolean;
        status: string;
        provider_id: number;
    };
}
export declare class CartResponseDto {
    id: number;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    items?: CartItemResponseDto[];
}
