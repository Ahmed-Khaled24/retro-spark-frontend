import { type FC } from "react";
import { Modal, type ModalProps } from "../../../components/Modal";
import { useDeleteMemberMutation } from "../TeamMembersApi";
import CustomButton from "../../../components/CustomButton";
import { type TeamMemberDto } from "../dtos/team-member.dto";
import DefaultAvatar from "../../../components/DefaultAvatar";
import { useGetCurrentUserQuery } from "../../auth/AuthApi";
import { errorToast, successToast } from "../../../utils/toasters";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { APIError } from "../../../app/api";

interface RemoveMemberModalProps
    extends Pick<ModalProps, "isOpen" | "toggleOpen"> {
    member: TeamMemberDto;
    teamId: number;
}

const RemoveMemberModal: FC<RemoveMemberModalProps> = ({
    isOpen,
    toggleOpen,
    member,
    teamId,
}) => {
    const { data: currentUser } = useGetCurrentUserQuery();
    const [remove, { isLoading }] = useDeleteMemberMutation();
    const memberName =
        member.user.id === currentUser?.id ? "You" : member.user.name;

    const removeMember = async () => {
        await remove({
            teamId,
            userId: member.user.id,
        })
            .unwrap()
            .then(() =>
                successToast(`"${member.user.name}" remove successfully!`),
            )
            .catch((e: FetchBaseQueryError) => {
                errorToast((e.data as APIError).message);
            });
        toggleOpen(false);
    };

    return (
        <Modal isOpen={isOpen} toggleOpen={toggleOpen} title={`Remove member`}>
            <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-4 justify-between px-4 pb-8">
                    <p className="text-lg">
                        Are you sure you want to remove this member?
                    </p>
                    <div className="flex gap-4 items-center">
                        <DefaultAvatar
                            name={member.user.name}
                            variant="success"
                        />
                        <div className="flex flex-col">
                            <span className="font-semibold">{memberName}</span>
                            <span className="text-sm opacity-50 -mt-1">
                                {member.user.email}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 flex-row-reverse">
                    <CustomButton
                        variant="primary"
                        className="rounded-lg w-30"
                        onClick={removeMember}
                        loading={isLoading}
                    >
                        Remove
                    </CustomButton>
                    <CustomButton
                        onClick={() => toggleOpen(false)}
                        className="rounded-lg w-30"
                        variant="primary"
                        outlined
                    >
                        Cancel
                    </CustomButton>
                </div>
            </div>
        </Modal>
    );
};

export default RemoveMemberModal;
