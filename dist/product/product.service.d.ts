import { CreateProductDto, DeleteProductDto, GetProductByIdDto, GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto, SearchProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { ProductDetail } from 'src/entity/product-detail.entity';
import { Product } from 'src/entity/product.entity';
import { Specs } from 'src/entity/specs.entity';
import { Repository } from 'typeorm';
import { Image } from '../entity/image.entity';
import { Color } from '../entity/color.entity';
export declare class ProductService {
    private productRepository;
    private productDetailRepository;
    private specsRepository;
    private imageRepository;
    private colorRepository;
    constructor(productRepository: Repository<Product>, productDetailRepository: Repository<ProductDetail>, specsRepository: Repository<Specs>, imageRepository: Repository<Image>, colorRepository: Repository<Color>);
    doCreateProduct(product: CreateProductDto): Promise<Product>;
    doGetProductDetailIdByProductIdAndColorIdAndCapacityId(data: GetProductDetailIdByProductIdAndColorIdAndCapacityIdDto): Promise<ProductDetail>;
    doGetAllProduct(searchParams: SearchProductDto): Promise<{
        data: Product[];
        pagination: {
            total: number;
            page: number;
            size: number;
            total_pages: number;
        };
    }>;
    doGetProductById(data: GetProductByIdDto): Promise<Product>;
    doUpdateProduct(data: UpdateProductDto): Promise<Product>;
    doDeleteProduct(data: DeleteProductDto): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
}
