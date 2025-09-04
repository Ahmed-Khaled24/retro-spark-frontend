import { useState } from "react";
import CustomButton from "../components/CustomButton";
import PageHeader from "../components/PageHeader";
import { CreateTeamModal } from "../features/teams/components/CreateTeamModal";
import TeamItem from "../features/teams/components/TeamItem";
import { FiPlus } from "react-icons/fi";
import { useGetAllTeamsQuery } from "../features/teams/TeamsApi";
import EmptyIllustration from "../assets/images/empty-illustration.svg";
import EmptyState from "../components/EmptyState";

const TeamsPage = () => {
    const [createTeamModalOpen, setCrateTeamModalOpen] = useState(false);
    const { data } = useGetAllTeamsQuery();
    const teams = data?.data;

    return (
        <>
            {/* Modals */}
            <CreateTeamModal
                isOpen={createTeamModalOpen}
                toggleOpen={(nextState?: boolean) =>
                    setCrateTeamModalOpen((prev) => nextState ?? !prev)
                }
            />
            {/* Main Content */}
            <main className="flex flex-col gap-10 h-full">
                <PageHeader title="Teams" />
                <div className="flex items-center justify-center flex-1">
                    <main className="bg-white rounded-xl w-4/5 h-9/10 p-8">
                        <header className="flex items-center justify-between border-b-1 border-primary-border pb-4">
                            <h1 className="text-xl font-semibold">
                                Manage your teams
                            </h1>
                            <CustomButton
                                className="px-6!"
                                onClick={() => setCrateTeamModalOpen(true)}
                                rounded
                            >
                                <FiPlus size={20} />
                                Create team
                            </CustomButton>
                        </header>
                        <div className="flex flex-col gap-6 py-8">
                            {teams && teams.length > 0 ? (
                                teams?.map((team) => <TeamItem {...team} />)
                            ) : (
                                <EmptyState
                                    imageUrl={EmptyIllustration}
                                    message="You don't have any teams yet."
                                />
                            )}
                        </div>
                    </main>
                </div>
            </main>
        </>
    );
};

export default TeamsPage;
