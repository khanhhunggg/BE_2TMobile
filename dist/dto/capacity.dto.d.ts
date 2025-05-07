export declare class CreateCapacityDto {
    value: number;
    unit: 'MB' | 'GB' | 'TB';
    display_name?: string;
}
export declare class UpdateCapacityDto {
    value?: number;
    unit?: 'MB' | 'GB' | 'TB';
    display_name?: string;
}
