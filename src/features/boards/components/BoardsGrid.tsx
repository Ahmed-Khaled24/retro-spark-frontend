import { useState } from "react";
import CustomButton from "../../../components/CustomButton";
import { HiPlus } from "react-icons/hi2";
import CreateBoardModal from "./CreateBoardModal";
import { BoardType, type BoardDto } from "../dtos/board.dto";
import BoardCard from "./BoardCard";

const BoardsGrid = () => {
    const [createBoardModalOpen, setCreateBoardModalOpen] = useState(false);

    const toggleCreateBoardModalOpen = (nextState?: boolean) => {
        setCreateBoardModalOpen((prev) => nextState ?? !prev);
    };

    const boards: BoardDto[] = [
        {
            id: 1,
            title: "Board 1.2",
            description: "",
            type: BoardType.PUBLIC,
            created_at: new Date().toLocaleDateString(),
            updated_at: new Date().toLocaleDateString(),
        },
        {
            id: 2,
            title: "Board 1.3",
            description: "",
            type: BoardType.PRIVATE,
            created_at: new Date().toLocaleDateString(),
            updated_at: new Date().toLocaleDateString(),
        },
        {
            id: 3,
            title: "Board 1.4",
            description: "",
            type: BoardType.PRIVATE,
            created_at: new Date().toLocaleDateString(),
            updated_at: new Date().toLocaleDateString(),
        },
    ];

    return (
        <>
            {/* Modals */}
            <CreateBoardModal
                isOpen={createBoardModalOpen}
                toggleOpen={toggleCreateBoardModalOpen}
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
                {boards.map((board) => (
                    <BoardCard key={board.id} {...board} />
                ))}
            </div>
        </>
    );
};

export default BoardsGrid;
