import { Repository } from 'typeorm';
import { Return } from '../entity/return.entity';
import { ReturnDetail } from '../entity/return-detail.entity';
import { CreateReturnDto, UpdateReturnDto, CreateReturnDetailDto } from '../dto/return.dto';
import { ReturnStatus } from '../entity/return-detail.entity';
import { OrderDetail } from '../entity/order-detail.entity';
import { PurchaseOrderItem } from '../entity/purchase-order-item.entity';
export declare class ReturnService {
    private returnRepository;
    private returnDetailRepository;
    private orderDetailRepository;
    private purchaseDetailRepository;
    constructor(returnRepository: Repository<Return>, returnDetailRepository: Repository<ReturnDetail>, orderDetailRepository: Repository<OrderDetail>, purchaseDetailRepository: Repository<PurchaseOrderItem>);
    create(createReturnDto: CreateReturnDto): Promise<Return>;
    findAll(status?: ReturnStatus, type?: string, customerId?: number): Promise<Return[]>;
    findOne(id: number): Promise<Return>;
    update(id: number, updateReturnDto: UpdateReturnDto): Promise<Return>;
    remove(id: number): Promise<void>;
    createReturnDetail(returnId: number, createReturnDetailDto: CreateReturnDetailDto): Promise<ReturnDetail>;
    updateReturnDetailStatus(returnId: number, detailId: number, status: ReturnStatus): Promise<ReturnDetail>;
    getReturnDetails(returnId: number, status?: ReturnStatus): Promise<ReturnDetail[]>;
}
