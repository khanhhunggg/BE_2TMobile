import { Repository } from 'typeorm';
import { Color } from '../entity/color.entity';
import { ColorResponseDto } from '../dto/color-response.dto';
export declare class ColorService {
    private colorRepository;
    constructor(colorRepository: Repository<Color>);
    getAllColors(data: ColorResponseDto): Promise<{
        id: number;
        name: string;
        color_code: string;
    }[]>;
    getColorById(id: ColorResponseDto): Promise<{
        id: number;
        name: string;
        color_code: string;
    }>;
}
