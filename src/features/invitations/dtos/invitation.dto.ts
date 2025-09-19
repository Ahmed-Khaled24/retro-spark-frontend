import type { UserDto } from "../../auth/dtos/user.dto";

export enum InvitationStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    EXPIRED = "EXPIRED",
}

export interface InvitationDto {
    id: string;
    status: InvitationStatus;
    invitedEmail: string;
    invitedBy: UserDto;
}

export interface CreateInvitationDto {
    /**
     * Emails separated by `,`
     */
    emails: string;
    teamId: number;
}
