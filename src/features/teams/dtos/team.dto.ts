import { z } from "zod";

export const TeamSchema = z.object({
    id: z.number(),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
});

export const CreateTeamSchema = TeamSchema.pick({
    title: true,
    description: true,
});

export const UpdateTeamSchema = CreateTeamSchema.partial();

export type TeamDto = z.infer<typeof TeamSchema>;
export type CreateTeamDto = z.infer<typeof CreateTeamSchema>;
export type UpdateTeamDto = z.infer<typeof UpdateTeamSchema>;
