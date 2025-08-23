import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import CustomButton from "../components/CustomButton";
import {
    TeamMemberRole,
    type TeamMemberDto,
} from "../features/teams/dtos/team-member.dto";
import MemberItem from "../features/teams/components/MemberItem";
import { useState } from "react";
import AddMemberModal from "../features/teams/components/AddMemberModal";
import { FiPlus } from "react-icons/fi";

const TeamPage = () => {
    const { id } = useParams();
    const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
    const members: TeamMemberDto[] = [
        {
            user: {
                id: 1,
                username: "Ahmed Khaled",
                email: "Ahmed@gmail.com",
            },
            role: TeamMemberRole.ADMIN,
        },
        {
            user: {
                id: 2,
                username: "Mohamed Khaled",
                email: "Mohamed@gmail.com",
            },
            role: TeamMemberRole.PARTICIPANT,
        },
        {
            user: {
                id: 3,
                username: "Yasser",
                email: "Yasser@gmail.com",
            },
            role: TeamMemberRole.FACILITATOR,
        },
    ];

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
                                Team title with id {id}
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
                            {members.map((member) => (
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
