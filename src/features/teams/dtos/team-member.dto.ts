import type { UserDto } from "../../auth/dtos/user.dto";

export enum TeamMemberRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    PARTICIPANT = "PARTICIPANT",
    FACILITATOR = "FACILITATOR",
}

export interface TeamMemberDto {
    user: UserDto;
    role: TeamMemberRole;
}
