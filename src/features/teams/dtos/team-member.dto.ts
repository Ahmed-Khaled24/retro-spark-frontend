import type { UserDto } from "../../auth/dtos/user.dto";

export enum TeamMemberRole {
    ADMIN = "admin",
    PARTICIPANT = "participant",
    FACILITATOR = "facilitator",
}
export interface TeamMemberDto {
    user: UserDto;
    // team: TeamDto; Leave this for now
    role: TeamMemberRole;
}
