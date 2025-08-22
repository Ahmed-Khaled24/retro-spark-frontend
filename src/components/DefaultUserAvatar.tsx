import { type FC } from "react";

interface DefaultUserAvatarProps {
    username: string;
}
const DefaultUserAvatar: FC<DefaultUserAvatarProps> = ({ username }) => {
    let nameAbbreviation = "";
    const nameParts = username.split(" ");

    if (nameParts.length === 1) {
        // Pick the first two characters of the name
        nameAbbreviation = username.slice(0, 2);
    } else {
        // Pick the first characters of the first two parts
        nameAbbreviation = nameParts[0][0] + nameParts[1][0];
    }

    return (
        <div className="w-14 h-14 rounded-full bg-secondary/75 flex items-center justify-center font-semibold text-xl select-none">
            {nameAbbreviation}
        </div>
    );
};

export default DefaultUserAvatar;
