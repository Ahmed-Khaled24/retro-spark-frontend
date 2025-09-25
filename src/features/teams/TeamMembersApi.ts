import { appApi, type APIResponse } from "../../app/api";
import type { TeamMemberDto, TeamMemberRole } from "./dtos/team-member.dto";

export const teamMembersApi = appApi.injectEndpoints({
    endpoints: ({ mutation, query }) => ({
        getMembers: query<APIResponse<TeamMemberDto[]>, number>({
            query: (teamId: number) => ({
                url: `teams/${teamId}/members`,
                method: "GET",
            }),
            providesTags: (_result, _error, teamId) => [
                { type: "Members", id: teamId },
            ],
        }),
        updateMemberRole: mutation<
            APIResponse<TeamMemberDto>,
            { teamId: number; userId: number; newRole: TeamMemberRole }
        >({
            query: ({ teamId, userId, newRole }) => ({
                url: `teams/${teamId}/members/${userId}`,
                method: "PATCH",
                body: { role: newRole },
            }),
            invalidatesTags: (_result, _error, { teamId }) => [
                { type: "Members", id: teamId },
            ],
        }),
        deleteMember: mutation<void, { teamId: number; userId: number }>({
            query: ({ teamId, userId }) => ({
                url: `teams/${teamId}/members/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, { teamId }) => [
                { type: "Members", id: teamId },
            ],
        }),
    }),
});

export const {
    useGetMembersQuery,
    useUpdateMemberRoleMutation,
    useDeleteMemberMutation,
} = teamMembersApi;
