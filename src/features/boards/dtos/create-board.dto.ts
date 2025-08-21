import type { BoardDto } from "./board.dto";

export interface CreateBoardDto
    extends Pick<BoardDto, "title" | "description" | "type"> {}
