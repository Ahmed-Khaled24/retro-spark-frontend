import { appApi, type APIResponse } from "../../app/api";
import type { BoardDto } from "./dtos/board.dto";
import type { CreateBoardDto } from "./dtos/create-board.dto";
import type { UpdateBoardDto } from "./dtos/update-board.dto";

export const boardsApi = appApi.injectEndpoints({
    endpoints: ({ mutation, query }) => ({
        getAllBoards: query<APIResponse<BoardDto[]>, number>({
            query: (teamId) => ({
                url: `teams/${teamId}/boards`,
                method: "GET",
            }),
            providesTags: ["Boards"],
        }),
        getBoard: query<
            APIResponse<BoardDto>,
            { teamId: number; boardId: number }
        >({
            query: ({ teamId, boardId }) => ({
                url: `teams/${teamId}/boards/${boardId}`,
                method: "GET",
            }),
            providesTags: (_result, _error, { boardId }) => [
                { type: "Boards", id: boardId },
            ],
        }),
        createBoard: mutation<
            APIResponse<BoardDto>,
            { data: CreateBoardDto; teamId: number }
        >({
            query: ({ data, teamId }) => ({
                url: `teams/${teamId}/boards`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Boards"],
        }),
        updateBoard: mutation<
            APIResponse<BoardDto>,
            { teamId: number; data: UpdateBoardDto; boardId: number }
        >({
            query: ({ teamId, data, boardId }) => ({
                url: `teams/${teamId}/boards/${boardId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (_result, _error, { boardId }) => [
                "Boards",
                { type: "Boards", id: boardId },
            ],
        }),
        deleteBoard: mutation<void, { teamId: number; boardId: number }>({
            query: ({ teamId, boardId }) => ({
                url: `teams/${teamId}/boards/${boardId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Boards"],
        }),
    }),
});

export const {
    useGetAllBoardsQuery,
    useGetBoardQuery,
    useCreateBoardMutation,
    useUpdateBoardMutation,
    useDeleteBoardMutation,
} = boardsApi;
