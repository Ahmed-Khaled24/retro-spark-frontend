import { z } from "zod";
import { BoardSchema } from "./board.dto";

export const CreateBoardSchema = BoardSchema.pick({
    title: true,
    description: true,
    type: true,
});

export type CreateBoardDto = z.infer<typeof CreateBoardSchema>;
