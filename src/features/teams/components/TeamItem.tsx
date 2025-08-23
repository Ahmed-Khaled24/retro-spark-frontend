import { useState, type FC } from "react";
import type { TeamDto } from "../dtos/team.dto";
import DefaultAvatar from "../../../components/DefaultAvatar";
import CustomButton from "../../../components/CustomButton";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { FaUserGear } from "react-icons/fa6";
import { DeleteTeamModal } from "./DeleteTeamModal";
import { EditTeamModal } from "./EditTeamNameModal";

const TeamItem: FC<TeamDto> = (team) => {
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    return (
        <>
            {/* Modals */}
            <DeleteTeamModal
                team={team}
                isOpen={deleteModalIsOpen}
                toggleOpen={(newState?: boolean) =>
                    setDeleteModalIsOpen((prev) => newState ?? !prev)
                }
            />
            <EditTeamModal
                team={team}
                isOpen={editModalIsOpen}
                toggleOpen={(newState?: boolean) =>
                    setEditModalIsOpen((prev) => newState ?? !prev)
                }
            />

            {/* Item */}
            <div className="py-4 flex items-center justify-between border-b-1 border-primary-border">
                <div className="flex gap-4 items-center">
                    <DefaultAvatar name={team.title} variant="success" />
                    <span className="font-semibold">{team.title}</span>
                </div>
                <div className="flex gap-2">
                    <CustomButton
                        className="w-12 h-12 p-0!"
                        variant="plain"
                        onClick={() => setEditModalIsOpen(true)}
                        rounded
                        outlined
                    >
                        <FiEdit />
                    </CustomButton>
                    <CustomButton
                        className="w-12 h-12 p-0!"
                        variant="plain"
                        onClick={() => setDeleteModalIsOpen(true)}
                        rounded
                        outlined
                    >
                        <GoTrash />
                    </CustomButton>
                    <CustomButton
                        variant="plain"
                        rounded
                        outlined
                        link={`/app/team/${team.id}`}
                    >
                        <FaUserGear />
                        <span>Manage</span>
                    </CustomButton>
                </div>
            </div>
        </>
    );
};

export default TeamItem;
