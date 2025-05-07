import { ReturnService } from './return.service';
import { CreateReturnDto, UpdateReturnDto, CreateReturnDetailDto } from '../dto/return.dto';
import { ReturnStatus } from '../entity/return-detail.entity';
import { Return } from '../entity/return.entity';
import { ReturnDetail } from '../entity/return-detail.entity';
import { ReturnType } from '../entity/return.entity';
export declare class ReturnController {
    private readonly returnService;
    constructor(returnService: ReturnService);
    create(createReturnDto: CreateReturnDto): Promise<Return>;
    findAll(status?: ReturnStatus, type?: ReturnType, customerId?: number): Promise<Return[]>;
    findOne(id: number): Promise<Return>;
    update(id: number, updateReturnDto: UpdateReturnDto): Promise<Return>;
    remove(id: number): Promise<void>;
    createReturnDetail(id: number, createReturnDetailDto: CreateReturnDetailDto): Promise<ReturnDetail>;
    getReturnDetails(id: number, status?: ReturnStatus): Promise<ReturnDetail[]>;
    updateReturnDetailStatus(id: number, detailId: number, status: ReturnStatus): Promise<ReturnDetail>;
}
