import { CreateProductDto, DeleteProductDto, GetProductByIdDto, GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto, SearchProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    CreateProduct(product: CreateProductDto): Promise<import("../entity/product.entity").Product>;
    GetAllProduct(searchParams: SearchProductDto): Promise<{
        data: import("../entity/product.entity").Product[];
        pagination: {
            total: number;
            page: number;
            size: number;
            total_pages: number;
        };
    }>;
    GetProductById(data: GetProductByIdDto): Promise<import("../entity/product.entity").Product>;
    GetProductDetailIdByProductIdAndColorIdAndCapacityId(data: GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto): Promise<import("../entity/product-detail.entity").ProductDetail>;
    UpdateProduct(data: UpdateProductDto): Promise<import("../entity/product.entity").Product>;
    DeleteProduct(data: DeleteProductDto): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
}
