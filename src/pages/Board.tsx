import { useParams } from "react-router-dom";

const BoardPage = () => {
    const { id } = useParams();
    return <div>{`Board with id ${id}`}</div>;
};

export default BoardPage;
