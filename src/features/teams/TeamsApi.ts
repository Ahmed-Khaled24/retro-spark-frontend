import { appApi, type APIResponse } from "../../app/api";
import type { CreateTeamDto, TeamDto, UpdateTeamDto } from "./dtos/team.dto";

export const teamsApi = appApi.injectEndpoints({
    endpoints: ({ mutation, query }) => ({
        getAllTeams: query<APIResponse<TeamDto[]>, void>({
            query: () => ({
                url: "teams",
                method: "GET",
            }),
            providesTags: ["Teams"],
        }),
        getTeam: query<APIResponse<TeamDto>, number>({
            query: (id: number) => ({
                url: `teams/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [{ type: "Teams", id }],
        }),
        createTeam: mutation<APIResponse<TeamDto>, CreateTeamDto>({
            query: (data) => ({
                url: "teams",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Teams"],
        }),
        updateTeam: mutation<
            APIResponse<TeamDto>,
            { id: number; data: UpdateTeamDto }
        >({
            query: ({ id, data }) => ({
                url: `teams/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                "Teams",
                { type: "Teams", id },
            ],
        }),
        deleteTeam: mutation<void, number>({
            query: (id) => ({
                url: `teams/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Teams"],
        }),
    }),
});

export const {
    useGetAllTeamsQuery,
    useGetTeamQuery,
    useCreateTeamMutation,
    useUpdateTeamMutation,
    useDeleteTeamMutation,
} = teamsApi;
