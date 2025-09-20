import { useState, type FC } from "react";
import DefaultAvatar from "../../../components/DefaultAvatar";
import { TeamMemberRole, type TeamMemberDto } from "../dtos/team-member.dto";
import Badge from "../../../components/Badge";
import Dropdown from "../../../components/Dropdown";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useGetCurrentUserQuery } from "../../auth/AuthApi";
import useGetUserTeamRole from "../../../hooks/useGetUserTeamRole";
import Authorize from "../../../components/Authorize";
import ChangeRoleModal from "./ChangeRoleModal";
import { IoTrashOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import RemoveMemberModal from "./RemoveMemberModal";
import type { CustomButtonProps } from "../../../components/CustomButton";

interface MemberItemProps {
    member: TeamMemberDto;
    teamId: number;
}
const MemberItem: FC<MemberItemProps> = ({ member, teamId }) => {
    const [changeRoleIsOpen, setChangeRoleIsOpen] = useState(false);
    const [removeMemberIsOpen, setRemoveMemberIsOpen] = useState(false);

    const { data: currentUser } = useGetCurrentUserQuery();

    const currentUserRole = useGetUserTeamRole(teamId);

    const allowedRoles = [TeamMemberRole.OWNER, TeamMemberRole.ADMIN];
    const isCurrentUser = member.user.id === currentUser?.id;
    const isOptionsDisabled =
        isCurrentUser || member.role === TeamMemberRole.OWNER;
    const memberName = isCurrentUser ? "You" : member.user.name;

    const roleColorMap: Record<
        TeamMemberRole,
        Required<CustomButtonProps["variant"]>
    > = {
        [TeamMemberRole.OWNER]: "primary",
        [TeamMemberRole.ADMIN]: "success",
        [TeamMemberRole.FACILITATOR]: "secondary",
        [TeamMemberRole.PARTICIPANT]: "plain",
    };

    return (
        <>
            {/* Modals */}
            <ChangeRoleModal
                teamId={teamId}
                member={member}
                currentRole={currentUserRole}
                isOpen={changeRoleIsOpen}
                toggleOpen={(nextState?: boolean) =>
                    setChangeRoleIsOpen((prev) => nextState ?? !prev)
                }
            />

            <RemoveMemberModal
                teamId={teamId}
                member={member}
                isOpen={removeMemberIsOpen}
                toggleOpen={(nextState?: boolean) =>
                    setRemoveMemberIsOpen((prev) => nextState ?? !prev)
                }
            />

            {/* Item */}
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
                        variant={roleColorMap[member.role]}
                        extraClasses="capitalize"
                    />
                    <Authorize
                        currentRole={currentUserRole}
                        allowedRoles={allowedRoles}
                    >
                        <Dropdown
                            anchor="bottom end"
                            menuClassName="bg-white text-sm rounded-xl shadow-xl p-1"
                            itemsClassName="rounded-lg"
                            mainButtonContent={
                                <HiOutlineDotsVertical
                                    size={24}
                                    className="hover:bg-plain/25 rounded-full p-3 w-12 h-12 transition-colors duration-250"
                                />
                            }
                            items={[
                                {
                                    content: (
                                        <div className="flex items-center gap-3 py-2 px-4">
                                            <IoTrashOutline width={24} />
                                            <span>Remove</span>
                                        </div>
                                    ),
                                    disabled: isOptionsDisabled,
                                    onClick: () => setRemoveMemberIsOpen(true),
                                },
                                {
                                    content: (
                                        <div className="flex items-center gap-3 py-2 px-4">
                                            <FaUserEdit width={24} />
                                            <span>Change Role</span>
                                        </div>
                                    ),
                                    disabled: isOptionsDisabled,
                                    onClick: () => setChangeRoleIsOpen(true),
                                },
                            ]}
                        />
                    </Authorize>
                </div>
            </div>
        </>
    );
};

export default MemberItem;
