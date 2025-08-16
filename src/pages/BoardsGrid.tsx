import PageHeader from "../components/PageHeader";
import BoardsGrid from "../features/boards/BoardsGrid";

const BoardsGridPage = () => {
    return (
        <div className="flex flex-col gap-10">
            <PageHeader title="Boards" />
            <BoardsGrid />
        </div>
    );
};

export default BoardsGridPage;
