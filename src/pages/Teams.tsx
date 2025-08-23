import { useState } from "react";
import CustomButton from "../components/CustomButton";
import PageHeader from "../components/PageHeader";
import { CreateTeamModal } from "../features/teams/components/CreateTeamModal";
import TeamItem from "../features/teams/components/TeamItem";
import type { TeamDto } from "../features/teams/dtos/team.dto";
import { FiPlus } from "react-icons/fi";

const TeamsPage = () => {
    const [createTeamModalOpen, setCrateTeamModalOpen] = useState(false);
    const teams: TeamDto[] = [
        {
            id: 1,
            title: "Ahmed's team",
        },
        {
            id: 2,
            title: "My Company Team",
        },
        {
            id: 3,
            title: "Test",
        },
    ];

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
                            {teams.map((team) => (
                                <TeamItem {...team} />
                            ))}
                        </div>
                    </main>
                </div>
            </main>
        </>
    );
};

export default TeamsPage;
