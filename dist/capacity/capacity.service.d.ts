import { Repository } from 'typeorm';
import { Capacity } from '../entity/capacity.entity';
import { CapacityPrice } from '../entity/capacity-price.entity';
import { CapacityResponseDto } from '../dto/capacity-response.dto';
import { UpdateCapacityPriceDto } from '../dto/capacity-price.dto';
export declare class CapacityService {
    private capacityRepository;
    private capacityPriceRepository;
    constructor(capacityRepository: Repository<Capacity>, capacityPriceRepository: Repository<CapacityPrice>);
    getAllCapacities(data: CapacityResponseDto): Promise<{
        id: number;
        value: number;
        unit: import("../entity/capacity.entity").CapacityUnit;
        display_name: string;
    }[]>;
    getCapacityById(id: CapacityResponseDto): Promise<{
        id: number;
        value: number;
        unit: import("../entity/capacity.entity").CapacityUnit;
        display_name: string;
    }>;
    updateCapacityPrice(capacityId: number, data: UpdateCapacityPriceDto): Promise<CapacityPrice>;
}
