import type { FC } from "react";
import { Modal, type ModalProps } from "../../../components/Modal";
import type { TeamDto } from "../dtos/team.dto";
import CustomButton from "../../../components/CustomButton";

interface DeleteTeamModalProps
    extends Pick<ModalProps, "isOpen" | "toggleOpen"> {
    team: TeamDto;
}

export const DeleteTeamModal: FC<DeleteTeamModalProps> = ({
    team,
    isOpen,
    toggleOpen,
}) => {
    const deleteTeam = () => {
        console.log(`Deleting team with id ${team.id}`);
        toggleOpen(false);
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
                    <CustomButton onClick={deleteTeam} className="rounded-lg">
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
