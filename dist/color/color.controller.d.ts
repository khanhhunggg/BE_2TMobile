import { ColorService } from './color.service';
import { ColorResponseDto } from '../dto/color-response.dto';
export declare class ColorController {
    private readonly colorService;
    constructor(colorService: ColorService);
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
