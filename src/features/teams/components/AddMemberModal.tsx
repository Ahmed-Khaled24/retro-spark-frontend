import { useState, type FC } from "react";
import { Modal, type ModalProps } from "../../../components/Modal";
import CustomTextarea from "../../../components/CustomTextarea";
import CustomButton from "../../../components/CustomButton";
import { useParams } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import { successToast } from "../../../utils/toasters";

interface AddMemberModalProps
    extends Pick<ModalProps, "isOpen" | "toggleOpen"> {}

const AddMemberModal: FC<AddMemberModalProps> = (props) => {
    const { id } = useParams();
    const [memberEmails, setMemberEmails] = useState("");

    const invitationLink = `${import.meta.env.VITE_BASE_URL}/teams/invite?team=${id}`;

    const inviteMembers = () => {
        setMemberEmails("");
        props.toggleOpen(false);
    };

    return (
        <Modal title="Add team member" {...props}>
            <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <p>
                            Share this invitation link with the members you want
                            to add
                        </p>
                        <p
                            className="px-4 py-1 bg-secondary/25 rounded-lg flex gap-2 items-center text-black/75 select-none cursor-pointer border-1 border-secondary text-sm"
                            onClick={() => {
                                window.navigator.clipboard.writeText(
                                    invitationLink,
                                );
                                successToast(
                                    "Invitation link copied to your clipboard!",
                                );
                            }}
                        >
                            <MdContentCopy />
                            {invitationLink}
                        </p>
                    </div>
                    <div className="relative border-b-1 border-primary-border h-0 ">
                        <span className="px-4 absolute left-1/2 top-0 bg-white -translate-y-1/2 -translate-x-1/2 text-black/50">
                            or
                        </span>
                    </div>
                    <CustomTextarea
                        label="Add email addresses separated by a comma"
                        onChange={(e) => setMemberEmails(e.target.value)}
                        labelPosition="embedded"
                        rounded="rounded-lg"
                        value={memberEmails}
                        rows={7}
                    />
                </div>
                <div className="flex gap-2 flex-row-reverse">
                    <CustomButton
                        variant="secondary"
                        className="rounded-lg"
                        onClick={inviteMembers}
                    >
                        Invite
                    </CustomButton>
                    <CustomButton
                        onClick={() => props.toggleOpen(false)}
                        className="rounded-lg"
                        variant="secondary"
                        outlined
                    >
                        Cancel
                    </CustomButton>
                </div>
            </div>
        </Modal>
    );
};

export default AddMemberModal;
