export enum BoardType {
    PUBLIC = "Public",
    PRIVATE = "Private",
}

export interface BoardDto {
    id: number;
    image_url?: string;
    title: string;
    description: string;
    type: BoardType;
    created_at: string;
    updated_at?: string;
}
