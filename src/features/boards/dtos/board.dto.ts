import { z } from "zod";

export enum BoardType {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
}

export const BoardSchema = z.object({
    id: z.number(),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string(),
    teamId: z.number(),
    type: z.enum(BoardType),
    is_anonymous: z.boolean(),
    created_at: z.string(),
    updated_at: z.string().optional(),
});

export type BoardDto = z.infer<typeof BoardSchema>;
