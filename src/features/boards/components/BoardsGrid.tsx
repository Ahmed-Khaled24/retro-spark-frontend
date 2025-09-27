import { useEffect, useState, type FC, type JSX } from "react";
import CustomButton from "../../../components/CustomButton";
import { HiPlus } from "react-icons/hi2";
import CreateBoardModal from "./CreateBoardModal";
import BoardCard from "./BoardCard";
import { useGetAllBoardsQuery } from "../BoardsApi";
import OvalLoader from "../../../components/OvalLoader";

interface BoardsGridProps {
    teamId: number;
}

const BoardsGrid: FC<BoardsGridProps> = ({ teamId }) => {
    const [createBoardModalOpen, setCreateBoardModalOpen] = useState(false);
    const [skip, setSkip] = useState(true);

    const { data, isLoading } = useGetAllBoardsQuery(teamId, { skip });
    const boards = data?.data ?? [];

    const toggleCreateBoardModalOpen = (nextState?: boolean) => {
        setCreateBoardModalOpen((prev) => nextState ?? !prev);
    };

    useEffect(() => {
        if (!teamId || teamId == -1) return;
        console.log(teamId);
        setSkip(false);
    }, [teamId]);

    let BoardsList: JSX.Element | JSX.Element[] = (
        <div className="flex items-center justify-center w-full h-full">
            <OvalLoader size={50} />
        </div>
    );

    if (boards && !isLoading) {
        BoardsList = boards.map((board) => (
            <BoardCard key={board.id} {...board} />
        ));
    }

    return (
        <>
            {/* Modals */}
            <CreateBoardModal
                isOpen={createBoardModalOpen}
                toggleOpen={toggleCreateBoardModalOpen}
                teamId={teamId}
            />

            {/* Grid */}
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(235px,_0))] gap-4 ">
                <CustomButton
                    className="h-[325px] rounded-lg flex flex-col items-center"
                    onClick={() => toggleCreateBoardModalOpen(true)}
                >
                    <HiPlus size={36} />
                    <span className="text-xl font-normal">New board</span>
                </CustomButton>
                {BoardsList}
            </div>
        </>
    );
};

export default BoardsGrid;
