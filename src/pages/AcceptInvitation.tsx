import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { Oval } from "react-loader-spinner";
import { useEffect } from "react";
import { useAcceptInvitationMutation } from "../features/invitations/InvitationsApi";
import { errorToast, successToast } from "../utils/toasters";
import type { APIError } from "../app/api";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
                navigate(`app/teams`);
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
                <Oval
                    height={80}
                    width={80}
                    color="#ff6f61"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#ff6f61"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div>
        </div>
    );
};

export default AcceptInvitation;
