import { useState, type FC } from "react";
import { Modal, type ModalProps } from "../../../components/Modal";
import CustomTextarea from "../../../components/CustomTextarea";
import CustomButton from "../../../components/CustomButton";
import { useParams } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import { errorToast, successToast } from "../../../utils/toasters";
import z from "zod";
import { useInviteMemberMutation } from "../../invitations/InvitationsApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { APIError } from "../../../app/api";

interface InviteMemberModalProps
    extends Pick<ModalProps, "isOpen" | "toggleOpen"> {}

const InviteMembersModal: FC<InviteMemberModalProps> = (props) => {
    const { id } = useParams();
    const [memberEmails, setMemberEmails] = useState("");
    const [invite, { isLoading }] = useInviteMemberMutation();

    const invitationLink = `${import.meta.env.VITE_BASE_URL}/teams/invite?team=${id}`;

    const inviteMembers = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate emails one by one
        let emails = memberEmails.split(",").map((email) => email.trim());
        for (let email of emails) {
            const { success } = await z.safeParseAsync(z.email(), email);
            if (!success) {
                errorToast(`${email} is not a valid email.`);
                return;
            }
        }

        await invite({
            emails: emails.join(","),
            teamId: parseInt(id!),
        })
            .unwrap()
            .then(() => {
                setMemberEmails("");
                props.toggleOpen(false);
            })
            .catch((e: FetchBaseQueryError) =>
                errorToast((e.data as APIError).message),
            );
    };

    return (
        <Modal title="Invite members" {...props}>
            <form className="p-6 flex flex-col gap-6" onSubmit={inviteMembers}>
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
                        required
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
                        className="rounded-lg w-30"
                        loading={isLoading}
                        buttonType="submit"
                    >
                        Invite
                    </CustomButton>
                    <CustomButton
                        onClick={() => props.toggleOpen(false)}
                        className="rounded-lg w-30"
                        variant="secondary"
                        outlined
                    >
                        Cancel
                    </CustomButton>
                </div>
            </form>
        </Modal>
    );
};

export default InviteMembersModal;
