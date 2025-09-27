import { useState, type FC } from "react";
import { Modal, type ModalProps } from "../../../components/Modal";
import CustomInput from "../../../components/CustomInput";
import CustomTextarea from "../../../components/CustomTextarea";
import CustomButton from "../../../components/CustomButton";
import {
    CreateBoardSchema,
    type CreateBoardDto,
} from "../dtos/create-board.dto";
import { BoardType } from "../dtos/board.dto";
import CustomSelect, {
    type CustomSelectOption,
} from "../../../components/CustomSelect";
import { useValidateForm } from "../../../hooks/useValidateForm";
import { useCreateBoardMutation } from "../BoardsApi";
import { errorToast, successToast } from "../../../utils/toasters";

interface CreateBoardModalProps
    extends Pick<ModalProps, "isOpen" | "toggleOpen"> {
    teamId: number;
}

const initialValue: CreateBoardDto = {
    title: "",
    description: "",
    type: BoardType.PUBLIC,
};

const CreateBoardModal: FC<CreateBoardModalProps> = (props) => {
    const [createBoard, { isLoading }] = useCreateBoardMutation();
    const { validate, fieldErrors } = useValidateForm(CreateBoardSchema);
    const [data, setData] = useState<CreateBoardDto>(initialValue);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setData({ ...data, [`${e.target.name}`]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = await validate(data);
        if (!isValid) return;

        await createBoard({ data, teamId: props.teamId })
            .unwrap()
            .then(() => {
                successToast("Board created successfully!");
                setData(initialValue);
                props.toggleOpen(false);
            })
            .catch(() => errorToast("Something went wrong!"));
    };

    return (
        <Modal title="Create board" wrapperClasses="px-4" {...props}>
            {/* Body Container */}
            <form className="flex flex-col gap-8 p-6" onSubmit={handleSubmit}>
                {/* Inputs */}
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                            label="Board Title"
                            placeholder="board title..."
                            rounded="rounded-lg"
                            name="title"
                            onChange={handleInputChange}
                            value={data.title}
                            error={fieldErrors.title?.at(0)}
                        />
                        <CustomSelect
                            label="Board Type"
                            value={{ id: data.type, content: data.type }}
                            options={Object.values(BoardType).map((type) => ({
                                id: type,
                                content: type,
                            }))}
                            onChange={(newValue: CustomSelectOption) =>
                                setData({
                                    ...data,
                                    type: newValue.content as BoardType,
                                })
                            }
                        />
                    </div>
                    <CustomTextarea
                        label="Board Description"
                        placeholder="board description..."
                        rounded="rounded-lg"
                        name="description"
                        onChange={handleInputChange}
                        value={data.description}
                        rows={4}
                        error={fieldErrors.description?.at(0)}
                    />
                </div>
                {/* Buttons */}
                <div className="flex flex-row-reverse gap-2">
                    <CustomButton
                        className="rounded-xl w-32"
                        buttonType="submit"
                        loading={isLoading}
                    >
                        Create
                    </CustomButton>
                    <CustomButton
                        className="rounded-xl w-32"
                        outlined
                        onClick={() => props.toggleOpen(false)}
                    >
                        Discard
                    </CustomButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateBoardModal;
