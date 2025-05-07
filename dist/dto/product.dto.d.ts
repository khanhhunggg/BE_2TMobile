import { CreateSpecsDto } from './specs.dto';
export declare class ProductDetailDto {
    id?: number;
    color_id: number;
    capacity_id: number;
    stock_quantity: number;
    serial_number?: string;
    import_price: string;
    selling_price: string;
}
export declare class CreateProductDto {
    name: string;
    description?: string;
    release_year?: number;
    warranty_period?: number;
    status?: 'Active' | 'Inactive';
    vendor_id: number;
    color_ids?: number[];
    capacity_id?: number;
    is_featured?: boolean;
    model?: string;
    specs?: CreateSpecsDto;
    image_urls?: string[];
    productDetail?: ProductDetailDto[];
}
export declare class UpdateProductDto {
    id: number;
    name?: string;
    model?: string;
    description?: string;
    warranty_period?: number;
    release_year?: number;
    is_featured?: boolean;
    status?: 'Active' | 'Inactive';
    vendor_id?: number;
    color_id?: number;
    capacity_id?: number;
    stock_quantity?: number;
    serial_number?: string;
    import_price?: string;
    selling_price?: string;
    specs?: CreateSpecsDto;
    image_urls?: string[];
    productDetail?: ProductDetailDto[];
}
export declare class GetProductByIdDto {
    id: number;
}
export declare class SearchProductDto {
    name?: string;
    model?: string;
    vendor_id?: number;
    color_id?: number;
    color_ids?: number[];
    capacity_id?: number;
    status?: 'Active' | 'Inactive';
    is_featured?: boolean;
    page?: number;
    size?: number;
}
export declare class DeleteProductDto {
    id: number;
}
export declare class GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto {
    product_id: number;
    color_id: number;
    capacity_id: number;
}
