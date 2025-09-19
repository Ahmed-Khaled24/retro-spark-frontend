import type { UserDto } from "../../auth/dtos/user.dto";

export enum TeamMemberRole {
    OWNER = "OWNER",
    PARTICIPANT = "PARTICIPANT",
    FACILITATOR = "FACILITATOR",
}

export interface TeamMemberDto {
    user: UserDto;
    role: TeamMemberRole;
}
