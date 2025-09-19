import { useGetCurrentUserQuery } from "../features/auth/AuthApi";
import { TeamMemberRole } from "../features/teams/dtos/team-member.dto";
import { useGetMembersQuery } from "../features/teams/TeamMembersApi";

const useGetUserTeamRole = (teamId: number) => {
    const { data: currentUser } = useGetCurrentUserQuery();

    const { data: membersData } = useGetMembersQuery(teamId);
    const members = membersData?.data ?? [];

    let role = TeamMemberRole.PARTICIPANT;

    const currentUserAsMember = members.find(
        (member) => currentUser?.id == member.user.id,
    );

    if (currentUserAsMember) {
        role = currentUserAsMember.role;
    }

    return role;
};

export default useGetUserTeamRole;
