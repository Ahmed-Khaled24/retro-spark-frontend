import { useState, type FC } from "react";
import { Modal, type ModalProps } from "../../../components/Modal";
import {
    UpdateTeamSchema,
    type TeamDto,
    type UpdateTeamDto,
} from "../dtos/team.dto";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import { useValidateForm } from "../../../hooks/useValidateForm";
import { useUpdateTeamMutation } from "../TeamsApi";
import { successToast } from "../../../utils/toasters";

interface UpdateTeamModalProps
    extends Pick<ModalProps, "isOpen" | "toggleOpen"> {
    team: TeamDto;
}

export const UpdateTeamModal: FC<UpdateTeamModalProps> = ({
    team,
    isOpen,
    toggleOpen,
}) => {
    const [updateTeam, { isLoading }] = useUpdateTeamMutation();
    const [fields, setFields] = useState<UpdateTeamDto>({
        title: team.title,
    });
    const { validate, fieldErrors } = useValidateForm(UpdateTeamSchema);

    const handleUpdateTeam = async () => {
        await validate(fields);
        await updateTeam({
            id: team.id,
            data: fields,
        }).unwrap();
        toggleOpen(false);
        successToast("Team updated successfully!");
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
                    value={fields.title}
                    onChange={(e) =>
                        setFields({ ...fields, title: e.target.value })
                    }
                    labelPosition="embedded"
                    rounded="rounded-lg"
                    error={fieldErrors?.title?.at(0)}
                />
                <div className="flex flex-row-reverse gap-2">
                    <CustomButton
                        onClick={handleUpdateTeam}
                        className="rounded-lg w-32"
                        loading={isLoading}
                    >
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
