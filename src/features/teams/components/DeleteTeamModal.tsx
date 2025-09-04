import type { FC } from "react";
import { Modal, type ModalProps } from "../../../components/Modal";
import type { TeamDto } from "../dtos/team.dto";
import CustomButton from "../../../components/CustomButton";
import { useDeleteTeamMutation } from "../TeamsApi";
import { successToast } from "../../../utils/toasters";

interface DeleteTeamModalProps
    extends Pick<ModalProps, "isOpen" | "toggleOpen"> {
    team: TeamDto;
}

export const DeleteTeamModal: FC<DeleteTeamModalProps> = ({
    team,
    isOpen,
    toggleOpen,
}) => {
    const [deleteTeam, { isLoading }] = useDeleteTeamMutation();
    const handleDeleteTeam = async () => {
        await deleteTeam(team.id).unwrap();
        toggleOpen(false);
        successToast("Team deleted successfully!");
    };

    return (
        <Modal
            title={`Deleting team`}
            isOpen={isOpen}
            toggleOpen={toggleOpen}
            wrapperClasses="px-2"
        >
            <div className="p-6 flex flex-col gap-6">
                <p>Are you sure you want to delete "{team.title}"?</p>
                <div className="flex flex-row-reverse gap-2">
                    <CustomButton
                        onClick={handleDeleteTeam}
                        className="rounded-lg w-32"
                        loading={isLoading}
                    >
                        Delete
                    </CustomButton>
                    <CustomButton
                        onClick={() => toggleOpen(false)}
                        className="rounded-lg"
                        outlined
                    >
                        Cancel
                    </CustomButton>
                </div>
            </div>
        </Modal>
    );
};
