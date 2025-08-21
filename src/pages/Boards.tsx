import PageHeader from "../components/PageHeader";
import BoardsGrid from "../features/boards/components/BoardsGrid";

const BoardsPage = () => {
    return (
        <div className="flex flex-col gap-10">
            <PageHeader title="Boards" />
            <BoardsGrid />
        </div>
    );
};

export default BoardsPage;
