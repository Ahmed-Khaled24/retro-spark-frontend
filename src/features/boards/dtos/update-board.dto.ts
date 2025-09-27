import { z } from "zod";
import { CreateBoardSchema } from "./create-board.dto";

export const UpdateBoardSchema = CreateBoardSchema.partial();

export type UpdateBoardDto = z.infer<typeof UpdateBoardSchema>;
