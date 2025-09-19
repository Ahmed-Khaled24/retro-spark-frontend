import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import CustomButton from "../components/CustomButton";
import MemberItem from "../features/teams/components/MemberItem";
import { useState } from "react";
import AddMemberModal from "../features/teams/components/AddMemberModal";
import { FiPlus } from "react-icons/fi";
import { useGetTeamQuery } from "../features/teams/TeamsApi";
import { useGetMembersQuery } from "../features/teams/TeamMembersApi";
import { useGetInvitationsQuery } from "../features/invitations/InvitationsApi";
import { InvitationItem } from "../features/invitations/components/InvitationItem";
import { TeamMemberRole } from "../features/teams/dtos/team-member.dto";
import Authorize from "../components/Authorize";
import useGetUserTeamRole from "../hooks/useGetUserTeamRole";
import EmptyState from "../components/EmptyState";
import EmptyIllustration from "../assets/images/empty-illustration.svg";
import clsx from "clsx";

const TeamPage = () => {
    const { id } = useParams();
    const { data: teamData } = useGetTeamQuery(parseInt(id!));
    const { data: membersData } = useGetMembersQuery(parseInt(id!));
    const { data: invitationsData } = useGetInvitationsQuery(parseInt(id!));

    const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);

    const team = teamData?.data;
    const members = membersData?.data ?? [];
    const invitations = invitationsData?.data ?? [];

    const allowedRoles = [TeamMemberRole.OWNER, TeamMemberRole.FACILITATOR];
    const currentUserRole = useGetUserTeamRole(parseInt(id!));

    const membersSectionClasses = clsx("flex flex-col", {
        "h-1/2": allowedRoles.includes(currentUserRole),
        "h-full": !allowedRoles.includes(currentUserRole),
    });

    return (
        <>
            {/* Modals */}
            <AddMemberModal
                isOpen={addMemberModalOpen}
                toggleOpen={(nextState?: boolean) =>
                    setAddMemberModalOpen((prev) => nextState ?? !prev)
                }
            />
            {/* Main Content */}
            <main className="flex flex-col gap-10 h-full">
                <PageHeader title="Manage team" />
                <div className="flex items-center justify-center h-9/10">
                    <main className="bg-white rounded-xl w-4/5 h-full p-8 flex flex-col gap-4">
                        {/* Members */}
                        <section className={membersSectionClasses}>
                            <header className="flex items-center justify-between border-b-1 border-primary-border pb-4">
                                <h1 className="text-xl font-semibold">
                                    {team?.title}
                                </h1>
                                <Authorize
                                    allowedRoles={allowedRoles}
                                    currentRole={currentUserRole}
                                >
                                    <CustomButton
                                        className="px-6!"
                                        onClick={() =>
                                            setAddMemberModalOpen(true)
                                        }
                                        rounded
                                    >
                                        <FiPlus size={20} />
                                        Add member
                                    </CustomButton>
                                </Authorize>
                            </header>
                            <div className="flex flex-col py-4 px-8 overflow-auto ">
                                {members?.map((member) => (
                                    <MemberItem
                                        member={member}
                                        teamId={parseInt(id!)}
                                    />
                                ))}
                            </div>
                        </section>
                        {/* Invitations */}
                        <Authorize
                            currentRole={currentUserRole}
                            allowedRoles={allowedRoles}
                        >
                            <section className="flex flex-col h-1/2">
                                <header className="flex items-center justify-between border-b-1 border-primary-border pb-4">
                                    <h1 className="text-xl font-semibold">
                                        Invitations
                                    </h1>
                                </header>
                                <div className="flex flex-col py-4 px-8 overflow-auto ">
                                    {invitations && invitations.length == 0 && (
                                        <div className="h-full">
                                            <EmptyState
                                                message="No invitations found!"
                                                imageUrl={EmptyIllustration}
                                            />
                                        </div>
                                    )}
                                    {invitations?.map((invitation) => (
                                        <InvitationItem {...invitation} />
                                    ))}
                                </div>
                            </section>
                        </Authorize>
                    </main>
                </div>
            </main>
        </>
    );
};

export default TeamPage;
