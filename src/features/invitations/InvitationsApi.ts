import { appApi, type APIResponse } from "../../app/api";
import type { CreateInvitationDto, InvitationDto } from "./dtos/invitation.dto";

export const invitationsApi = appApi.injectEndpoints({
    endpoints: ({ mutation, query }) => ({
        getInvitations: query<APIResponse<InvitationDto[]>, number>({
            query: (teamId: number) => ({
                url: `invitations/teams/${teamId}`,
                method: "GET",
            }),
            providesTags: ["Invitations"],
        }),
        inviteMember: mutation<APIResponse<InvitationDto>, CreateInvitationDto>(
            {
                query: ({ teamId, emails }) => ({
                    url: `invitations/teams/${teamId}`,
                    method: "POST",
                    body: { emails },
                }),
                invalidatesTags: ["Invitations"],
            },
        ),
        resendInvitation: mutation<void, number>({
            query: (invitationId) => ({
                url: `invitations/${invitationId}/resend`,
                method: "POST",
            }),
        }),
        acceptInvitation: mutation<void, string>({
            query: (invitationHash: string) => ({
                url: `invitations/accept/${invitationHash}`,
                method: "POST",
            }),
            invalidatesTags: ["Invitations"],
        }),
    }),
});

export const {
    useGetInvitationsQuery,
    useInviteMemberMutation,
    useResendInvitationMutation,
    useAcceptInvitationMutation,
} = invitationsApi;
