import { useState, type FC } from "react";
import { Modal, type ModalProps } from "../../../components/Modal";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";

interface CreateTeamModalProps
    extends Pick<ModalProps, "isOpen" | "toggleOpen"> {}

export const CreateTeamModal: FC<CreateTeamModalProps> = ({
    isOpen,
    toggleOpen,
}) => {
    const [title, setTitle] = useState("");
    const createTeam = () => {
        console.log(`Creating team with title ${title}`);
        toggleOpen(false);
    };

    return (
        <Modal
            title={`Create a team`}
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
                    <CustomButton onClick={createTeam} className="rounded-lg">
                        Create
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
