import { type FC } from "react";
import { BoardType, type BoardDto } from "../dtos/board.dto";
import { Link } from "react-router-dom";
import DefaultImg1 from "../../../assets/images/board-1.svg";
import DefaultImg2 from "../../../assets/images/board-2.svg";
import DefaultImg3 from "../../../assets/images/board-3.svg";
import DefaultImg4 from "../../../assets/images/board-4.svg";
import DefaultImg5 from "../../../assets/images/board-5.svg";
import DefaultImg6 from "../../../assets/images/board-6.svg";
import DefaultImg7 from "../../../assets/images/board-7.svg";
import Badge from "../../../components/Badge";

/**
 * Every card picks an image based on the Id of the card.
 * Note that this only valid in case of the Id is
 * an integer.
 */
const CardBuiltInImages: string[] = [
    DefaultImg1,
    DefaultImg2,
    DefaultImg3,
    DefaultImg4,
    DefaultImg5,
    DefaultImg6,
    DefaultImg7,
];

const BoardCard: FC<BoardDto> = (board) => {
    return (
        <Link
            to={`/app/board/${board.id}`}
            className="border-1 border-primary-border rounded-lg flex flex-col h-[325px] p-1 shadow-xs"
        >
            <img
                src={CardBuiltInImages[board.id % CardBuiltInImages.length]}
                alt="board image"
                className="h-2/3 rounded-md bg-primary/7.5 p-2"
            />
            <div className="flex flex-col px-2 py-6 h-1/3">
                <div className="flex justify-between">
                    <h1 className="text-base">{board.title}</h1>
                    <Badge
                        content={board.type}
                        variant={
                            board.type === BoardType.PRIVATE
                                ? "secondary"
                                : "success"
                        }
                    />
                </div>
                <div className="mt-auto">
                    <span className="text-xs opacity-50">
                        Last modified at {board.updated_at}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default BoardCard;
