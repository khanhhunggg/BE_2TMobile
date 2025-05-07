import { CapacityService } from './capacity.service';
import { CapacityResponseDto } from '../dto/capacity-response.dto';
export declare class CapacityController {
    private readonly capacityService;
    constructor(capacityService: CapacityService);
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
}
