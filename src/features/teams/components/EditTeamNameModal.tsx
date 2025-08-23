import { useState, type FC } from "react";
import { Modal, type ModalProps } from "../../../components/Modal";
import type { TeamDto } from "../dtos/team.dto";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";

interface EditTeamModalProps extends Pick<ModalProps, "isOpen" | "toggleOpen"> {
    team: TeamDto;
}

export const EditTeamModal: FC<EditTeamModalProps> = ({
    team,
    isOpen,
    toggleOpen,
}) => {
    const [title, setTitle] = useState(team.title);
    const editTeam = () => {
        console.log(`Editing team with id ${team.id}`);
        toggleOpen(false);
    };

    return (
        <Modal
            title={`Edit team title`}
            isOpen={isOpen}
            toggleOpen={toggleOpen}
            wrapperClasses="px-2"
        >
            <div className="p-6 flex flex-col gap-6">
                <CustomInput
                    label="Team title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    labelPosition="embedded"
                    rounded="rounded-lg"
                />
                <div className="flex flex-row-reverse gap-2">
                    <CustomButton onClick={editTeam} className="rounded-lg">
                        Save
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
