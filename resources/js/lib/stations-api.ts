import type { Station, StationInput } from '@/types/station';

interface ApiResponse<T> {
    data: T;
}

export class ApiError extends Error {
    status: number;
    fields?: Record<string, string[]>;

    constructor(message: string, status: number, fields?: Record<string, string[]>) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.fields = fields;
    }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(`/api${path}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok) {
            throw new ApiError(payload?.message ?? 'The request could not be completed.', response.status, payload?.errors);
        }

        return payload as T;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError('Unable to connect to the station service.', 0);
    }
}

export async function getStations(): Promise<Station[]> {
    const response = await request<ApiResponse<Station[]>>('/stations');
    return response.data;
}

export async function getStation(id: string): Promise<Station> {
    const response = await request<ApiResponse<Station>>(`/stations/${id}`);
    return response.data;
}

export async function createStation(input: StationInput): Promise<Station> {
    const response = await request<ApiResponse<Station>>('/stations', {
        method: 'POST',
        body: JSON.stringify(input),
    });
    return response.data;
}
