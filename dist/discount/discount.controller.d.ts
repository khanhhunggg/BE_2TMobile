import { AssignDiscountToUserDto, CreateDiscountDto, DeleteDiscountDto, GetDiscountByIdDto, RemoveDiscountFromUserDto, SearchDiscountDto, UpdateDiscountDto } from 'src/dto/discount.dto';
import { DiscountService } from './discount.service';
export declare class DiscountController {
    private readonly discountService;
    constructor(discountService: DiscountService);
    CreateDiscount(discount: CreateDiscountDto): Promise<import("../entity/discount.entity").Discount>;
    GetAllDiscount(searchParams: SearchDiscountDto): Promise<{
        data: import("../entity/discount.entity").Discount[];
        pagination: {
            total: number;
            page: number;
            size: number;
            total_pages: number;
        };
    }>;
    GetDiscountById(data: GetDiscountByIdDto): Promise<import("../entity/discount.entity").Discount>;
    UpdateDiscount(data: UpdateDiscountDto): Promise<import("../entity/discount.entity").Discount>;
    DeleteDiscount(data: DeleteDiscountDto): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
    assignDiscountToUser(data: AssignDiscountToUserDto): Promise<import("../entity/discountUser.entity").DiscountUser>;
    removeDiscountFromUser(data: RemoveDiscountFromUserDto): Promise<{
        message: string;
        data: {
            discountId: number;
            userId: number;
        };
    }>;
}
