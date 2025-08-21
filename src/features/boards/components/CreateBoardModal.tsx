import { useState, type FC } from "react";
import { Modal, type ModalProps } from "../../../components/Modal";
import CustomInput from "../../../components/CustomInput";
import CustomTextarea from "../../../components/CustomTextarea";
import CustomButton from "../../../components/CustomButton";
import type { CreateBoardDto } from "../dtos/create-board.dto";
import { BoardType } from "../dtos/board.dto";
import CustomSelect from "../../../components/CustomSelect";

const CreateBoardModal: FC<Pick<ModalProps, "isOpen" | "toggleOpen">> = (
    props,
) => {
    const [data, setData] = useState<CreateBoardDto>({
        title: "",
        description: "",
        type: BoardType.PUBLIC,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setData({ ...data, [`${e.target.name}`]: e.target.value });
    };

    const handleSubmit = () => {};

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
                        />
                        <CustomSelect
                            label="Board Type"
                            value={data.type}
                            options={Object.values(BoardType)}
                            onChange={(newValue: string) =>
                                setData({
                                    ...data,
                                    type: newValue as BoardType,
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
                    />
                </div>
                {/* Buttons */}
                <div className="flex flex-row-reverse gap-2">
                    <CustomButton className="rounded-xl" buttonType="submit">
                        Create
                    </CustomButton>
                    <CustomButton
                        className="rounded-xl"
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
