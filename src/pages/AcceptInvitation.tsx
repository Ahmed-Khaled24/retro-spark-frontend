import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useEffect } from "react";
import { useAcceptInvitationMutation } from "../features/invitations/InvitationsApi";
import { errorToast, successToast } from "../utils/toasters";
import type { APIError } from "../app/api";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import OvalLoader from "../components/OvalLoader";

const AcceptInvitation = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [acceptInvitation] = useAcceptInvitationMutation();

    useEffect(() => {
        const invitationId = searchParams.get("invitationId");
        if (!invitationId) {
            errorToast("Invitation doesn't found");
            return;
        }

        acceptInvitation(invitationId)
            .unwrap()
            .then(() => {
                successToast("Invitation accepted successfully!");
                navigate(`/app/teams`);
            })
            .catch((e: FetchBaseQueryError) => {
                errorToast((e.data as APIError).message);
            });
    }, [searchParams]);

    return (
        <div className="flex flex-col gap-10 h-full">
            <div className="flex items-center justify-between">
                <PageHeader title={`Accepting invitation...`} />
            </div>
            <div className="flex items-center justify-center flex-1">
                <OvalLoader size={80} />
            </div>
        </div>
    );
};

export default AcceptInvitation;
