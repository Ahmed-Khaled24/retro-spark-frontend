import { type FC } from "react";
import { type InvitationDto } from "../dtos/invitation.dto";
import DefaultAvatar from "../../../components/DefaultAvatar";
import { useGetCurrentUserQuery } from "../../auth/AuthApi";
import Badge from "../../../components/Badge";
import Dropdown from "../../../components/Dropdown";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { infoToast } from "../../../utils/toasters";

export const InvitationItem: FC<InvitationDto> = (invitation) => {
    const { data: currentUser } = useGetCurrentUserQuery();

    const invitedBy =
        currentUser?.id == invitation?.invitedBy.id
            ? "you"
            : invitation.invitedBy.name;

    return (
        <div className="py-4 flex items-center justify-between border-b-1 border-primary-border/50">
            <div className="flex gap-4 items-center">
                <DefaultAvatar
                    name={invitation.invitedEmail}
                    variant="secondary"
                />
                <div className="flex flex-col">
                    <span className="font-semibold">
                        {invitation.invitedEmail}
                    </span>
                    <span className="text-sm opacity-50 -mt-1">
                        Invited by {invitedBy}
                    </span>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <Badge
                    content={invitation.status.toLowerCase()}
                    variant="secondary"
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
                            content: "Expire invitation",
                            onClick: () => {
                                infoToast("This is not implemented yet");
                            },
                        },
                    ]}
                />
            </div>
        </div>
    );
};
``;
