import type { FC } from "react";
import DefaultAvatar from "../../../components/DefaultAvatar";
import { TeamMemberRole, type TeamMemberDto } from "../dtos/team-member.dto";
import Badge from "../../../components/Badge";
import Dropdown from "../../../components/Dropdown";
import { HiOutlineDotsVertical } from "react-icons/hi";

const MemberItem: FC<TeamMemberDto> = (member) => {
    return (
        <div className="py-4 flex items-center justify-between border-b-1 border-primary-border">
            <div className="flex gap-4 items-center">
                <DefaultAvatar
                    name={member.user.username}
                    variant="secondary"
                />
                <div className="flex flex-col">
                    <span className="font-semibold">
                        {member.user.username}
                    </span>
                    <span className="text-sm opacity-50 -mt-1">
                        {member.user.email}
                    </span>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <Badge
                    content={member.role}
                    variant={
                        member.role === TeamMemberRole.ADMIN
                            ? "primary"
                            : member.role === TeamMemberRole.FACILITATOR
                              ? "success"
                              : "secondary"
                    }
                    extraClasses="capitalize"
                />
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
                            onClick: () => {},
                        },
                        {
                            content: "Change role",
                            onClick: () => {},
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default MemberItem;
