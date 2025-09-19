import type { FC } from "react";
import DefaultAvatar from "../../../components/DefaultAvatar";
import { TeamMemberRole, type TeamMemberDto } from "../dtos/team-member.dto";
import Badge from "../../../components/Badge";
import Dropdown from "../../../components/Dropdown";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { infoToast } from "../../../utils/toasters";
import { useGetCurrentUserQuery } from "../../auth/AuthApi";
import useGetUserTeamRole from "../../../hooks/useGetUserTeamRole";
import Authorize from "../../../components/Authorize";

interface MemberItemProps {
    member: TeamMemberDto;
    teamId: number;
}
const MemberItem: FC<MemberItemProps> = ({ member, teamId }) => {
    const { data: currentUser } = useGetCurrentUserQuery();
    const currentUserRole = useGetUserTeamRole(teamId);
    const allowedRoles = [TeamMemberRole.OWNER];
    const memberName =
        member.user.id === currentUser?.id ? "You" : member.user.name;

    return (
        <div className="py-4 flex items-center justify-between border-b-1 border-primary-border/50">
            <div className="flex gap-4 items-center">
                <DefaultAvatar name={member.user.name} variant="success" />
                <div className="flex flex-col">
                    <span className="font-semibold">{memberName}</span>
                    <span className="text-sm opacity-50 -mt-1">
                        {member.user.email}
                    </span>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <Badge
                    content={member.role.toLowerCase()}
                    variant={
                        member.role === TeamMemberRole.OWNER
                            ? "primary"
                            : member.role === TeamMemberRole.FACILITATOR
                              ? "success"
                              : "secondary"
                    }
                    extraClasses="capitalize"
                />
                <Authorize
                    currentRole={currentUserRole}
                    allowedRoles={allowedRoles}
                >
                    <Dropdown
                        anchor="bottom end"
                        menuClassName="bg-white text-sm rounded-lg shadow-xl"
                        mainButtonContent={
                            <HiOutlineDotsVertical
                                size={24}
                                className="hover:bg-plain/25 rounded-full p-3 w-12 h-12 transition-colors duration-250"
                            />
                        }
                        items={[
                            {
                                content: "Remove from team",
                                onClick: () => {
                                    infoToast("This is not implemented yet");
                                },
                            },
                            {
                                content: "Change role",
                                onClick: () => {
                                    infoToast("This is not implemented yet");
                                },
                            },
                        ]}
                    />
                </Authorize>
            </div>
        </div>
    );
};

export default MemberItem;
