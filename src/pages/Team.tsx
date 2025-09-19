import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import CustomButton from "../components/CustomButton";
import MemberItem from "../features/teams/components/MemberItem";
import { useState } from "react";
import AddMemberModal from "../features/teams/components/AddMemberModal";
import { FiPlus } from "react-icons/fi";
import { useGetTeamQuery } from "../features/teams/TeamsApi";
import { useGetMembersQuery } from "../features/teams/TeamMembersApi";

const TeamPage = () => {
    const { id } = useParams();
    const { data: teamData } = useGetTeamQuery(parseInt(id!));
    const { data: membersData } = useGetMembersQuery(parseInt(id!));

    const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);

    const team = teamData?.data;
    const members = membersData?.data ?? [];

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
                <div className="flex items-center justify-center flex-1">
                    <main className="bg-white rounded-xl w-4/5 h-9/10 p-8">
                        <header className="flex items-center justify-between border-b-1 border-primary-border pb-4">
                            <h1 className="text-xl font-semibold">
                                {team?.title}
                            </h1>
                            <CustomButton
                                className="px-6!"
                                onClick={() => setAddMemberModalOpen(true)}
                                rounded
                            >
                                <FiPlus size={20} />
                                Add member
                            </CustomButton>
                        </header>
                        <div className="flex flex-col gap-6 py-8">
                            {members?.map((member) => (
                                <MemberItem {...member} />
                            ))}
                        </div>
                    </main>
                </div>
            </main>
        </>
    );
};

export default TeamPage;
