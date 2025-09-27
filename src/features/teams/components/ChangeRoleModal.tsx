import { useState, type FC } from "react";
import { Modal, type ModalProps } from "../../../components/Modal";
import { useUpdateMemberRoleMutation } from "../TeamMembersApi";
import CustomButton from "../../../components/CustomButton";
import { TeamMemberRole, type TeamMemberDto } from "../dtos/team-member.dto";
import DefaultAvatar from "../../../components/DefaultAvatar";
import { useGetCurrentUserQuery } from "../../auth/AuthApi";
import CustomSelect, {
    type CustomSelectOption,
} from "../../../components/CustomSelect";
import { errorToast, infoToast, successToast } from "../../../utils/toasters";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { APIError } from "../../../app/api";

interface ChangeRoleModalProps
    extends Pick<ModalProps, "isOpen" | "toggleOpen"> {
    currentRole: TeamMemberRole;
    member: TeamMemberDto;
    teamId: number;
}

const ChangeRoleModal: FC<ChangeRoleModalProps> = ({
    isOpen,
    toggleOpen,
    member,
    teamId,
}) => {
    const [currentRole, setCurrentRole] = useState<CustomSelectOption>({
        id: member.role,
        content: member.role,
    });
    const { data: currentUser } = useGetCurrentUserQuery();
    const [updateRole, { isLoading }] = useUpdateMemberRoleMutation();
    const memberName =
        member.user.id === currentUser?.id ? "You" : member.user.name;

    const changeRole = async () => {
        if (currentRole.content === member.role) {
            infoToast("No change in role was made");
        } else {
            await updateRole({
                teamId,
                userId: member.user.id,
                newRole: currentRole.content as TeamMemberRole,
            })
                .unwrap()
                .then(() => successToast("Role updated successfully!"))
                .catch((e: FetchBaseQueryError) => {
                    errorToast((e.data as APIError).message);
                });
        }
        toggleOpen(false);
    };

    return (
        <Modal isOpen={isOpen} toggleOpen={toggleOpen} title={`Change role`}>
            <div className="p-6 flex flex-col gap-6">
                <div className="flex justify-between py-8 px-4">
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
                    <div className="w-1/3">
                        <CustomSelect
                            value={currentRole}
                            options={Object.values(TeamMemberRole)
                                .filter((role) => role !== TeamMemberRole.OWNER)
                                .map((role) => ({ id: role, content: role }))}
                            onChange={(newValue) => setCurrentRole(newValue)}
                        />
                    </div>
                </div>
                <div className="flex gap-2 flex-row-reverse">
                    <CustomButton
                        variant="primary"
                        className="rounded-lg w-30"
                        onClick={changeRole}
                        loading={isLoading}
                    >
                        Save
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

export default ChangeRoleModal;
