import { _date } from "zod/v4/core";
import { appApi, type APIResponse } from "../../app/api";
import type { TeamMemberDto } from "./dtos/team-member.dto";

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
            { teamId: number; memberId: number }
        >({
            query: ({ teamId, memberId }) => ({
                url: `teams/${teamId}/members/${memberId}`,
                method: "PATCH",
            }),
            invalidatesTags: (_result, _error, { teamId }) => [
                { type: "Members", id: teamId },
            ],
        }),
        deleteMember: mutation<void, { teamId: number; memberId: number }>({
            query: ({ teamId, memberId }) => ({
                url: `teams/${teamId}/members/${memberId}`,
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
