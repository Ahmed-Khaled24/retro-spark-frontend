import { useParams } from "react-router-dom";

const BoardSettingsPage = () => {
    const { id } = useParams();
    return <div>{`Board settings for board with id ${id}`}</div>;
};

export default BoardSettingsPage;
