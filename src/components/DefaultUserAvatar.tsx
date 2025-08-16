import { type FC } from "react";

interface DefaultUserAvatarProps {
    username: string;
}
const DefaultUserAvatar: FC<DefaultUserAvatarProps> = ({ username }) => {
    return (
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center font-bold text-xl select-none">
            {username
                .split(" ")
                .map((name) => name[0])
                .join("")}
        </div>
    );
};

export default DefaultUserAvatar;
