export type StationCategory = 'Regular' | 'VIP' | 'Streaming Room';

export interface Station {
    id: number;
    station_name: string;
    category: StationCategory;
    hourly_rate: string;
    created_at: string;
    updated_at: string;
}

export interface StationInput {
    station_name: string;
    category: StationCategory | '';
    hourly_rate: string;
}
