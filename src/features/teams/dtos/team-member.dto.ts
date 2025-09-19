import type { UserDto } from "../../auth/dtos/user.dto";

export enum TeamMemberRole {
    ADMIN = "ADMIN",
    PARTICIPANT = "PARTICIPANT",
    FACILITATOR = "FACILITATOR",
}

export interface TeamMemberDto {
    user: UserDto;
    role: TeamMemberRole;
}
