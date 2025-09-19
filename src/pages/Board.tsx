import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { IoSettingsOutline } from "react-icons/io5";

const BoardPage = () => {
    const { id } = useParams();
    return (
        <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
                <PageHeader title={`Board with id ${id}`} />
                <Link to={`/app/board/${id}/settings`}>
                    <IoSettingsOutline size={24} />
                </Link>
            </div>
        </div>
    );
};

export default BoardPage;
