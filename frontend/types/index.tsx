export interface Spot {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    image_url: string[];
    criteria: Criteria[];
}

export interface Criteria {
    id: number;
    attribute: string;
}