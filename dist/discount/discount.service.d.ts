import { Repository } from 'typeorm';
import { Discount } from '../entity/discount.entity';
import { DiscountUser } from '../entity/discountUser.entity';
import { CreateDiscountDto, DeleteDiscountDto, GetDiscountByIdDto, RemoveDiscountFromUserDto, SearchDiscountDto, UpdateDiscountDto } from 'src/dto/discount.dto';
export declare class DiscountService {
    private discountRepository;
    private readonly discountUserRepository;
    constructor(discountRepository: Repository<Discount>, discountUserRepository: Repository<DiscountUser>);
    doCreateDiscount(discount: CreateDiscountDto): Promise<Discount>;
    doGetAllDiscount(searchParams: SearchDiscountDto): Promise<{
        data: Discount[];
        pagination: {
            total: number;
            page: number;
            size: number;
            total_pages: number;
        };
    }>;
    doGetDiscountById(data: GetDiscountByIdDto): Promise<Discount>;
    doUpdateDiscount(data: UpdateDiscountDto): Promise<Discount>;
    doDeleteDiscount(data: DeleteDiscountDto): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
    assignDiscountToUser(discountId: number, userId: number): Promise<DiscountUser>;
    removeDiscountFromUser(data: RemoveDiscountFromUserDto): Promise<{
        message: string;
        data: {
            discountId: number;
            userId: number;
        };
    }>;
}
