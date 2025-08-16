import CustomButton from "../../components/CustomButton";
import { HiPlus } from "react-icons/hi2";

const BoardsGrid = () => {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(235px,_0))] gap-4 ">
            <CustomButton className="h-[325px] rounded-lg flex flex-col items-center">
                <HiPlus size={36} />
                <span className="text-xl font-normal">New board</span>
            </CustomButton>
        </div>
    );
};

export default BoardsGrid;
