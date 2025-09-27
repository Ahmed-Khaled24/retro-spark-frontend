import { useEffect, useState } from "react";
import CustomSelect, {
    type CustomSelectOption,
} from "../components/CustomSelect";
import PageHeader from "../components/PageHeader";
import BoardsGrid from "../features/boards/components/BoardsGrid";
import { useGetAllTeamsQuery } from "../features/teams/TeamsApi";

const BoardsPage = () => {
    const { data: teamsData, isLoading } = useGetAllTeamsQuery();

    const teams = teamsData?.data ?? [];
    const teamsSelectOptions = teams.map((team) => ({
        id: team.id,
        content: team.title,
    }));

    const [currentSelectedTeam, setCurrentSelectedTeam] =
        useState<CustomSelectOption>({
            id: "",
            content: "",
        });

    useEffect(() => {
        const teamName = isLoading ? "Loading..." : (teams[0]?.title ?? "N/A");
        const teamId = isLoading ? -1 : (teams[0]?.id ?? -1);
        setCurrentSelectedTeam({ id: teamId, content: teamName });
    }, [teams]);

    const handleChange = (newValue: CustomSelectOption) => {
        setCurrentSelectedTeam(newValue);
    };

    return (
        <div className="flex flex-col gap-10">
            <div className="flex justify-between items-center">
                <PageHeader title="Boards" />
                <div className="w-48">
                    <CustomSelect
                        options={teamsSelectOptions}
                        value={currentSelectedTeam}
                        onChange={handleChange}
                        mainButtonExtraClasses="shadow-sm bg-white"
                    />
                </div>
            </div>
            <BoardsGrid teamId={currentSelectedTeam.id as number} />
        </div>
    );
};

export default BoardsPage;
