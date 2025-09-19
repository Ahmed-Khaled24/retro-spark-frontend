import clsx from "clsx";
import { type FC } from "react";

interface DefaultAvatarProps {
    name: string;
    /**
     * Width or height of the avatar.
     * Note that it has 1:1 aspect ratio.
     * @example "32px", "2rem", "25%"
     */
    size?: "xs" | "sm" | "md" | "lg";
    variant?: "primary" | "secondary" | "success";
    extraClasses?: string;
}
const DefaultAvatar: FC<DefaultAvatarProps> = ({
    name,
    size = "sm",
    variant = "primary",
    extraClasses,
}) => {
    let nameAbbreviation = "";
    const nameParts = name.split(" ");

    if (nameParts.length === 1) {
        // Pick the first two characters of the name
        nameAbbreviation = name.slice(0, 2);
    } else {
        // Pick the first characters of the first two parts
        nameAbbreviation = nameParts[0][0] + nameParts[1][0];
    }

    const classes = clsx(
        `rounded-full flex items-center justify-center font-semibold text-xl select-none`,
        {
            "bg-secondary/75": variant === "secondary",
            "bg-primary/75 text-white": variant === "primary",
            "bg-success/75 text-white": variant === "success",
            "w-10 h-10 text-lg!": size === "xs",
            "w-12 h-12 text-lg!": size === "sm",
            "w-14 h-14": size === "md",
            "w-16 h-16": size === "lg",
        },
        extraClasses,
    );

    return <div className={classes}>{nameAbbreviation.toUpperCase()}</div>;
};

export default DefaultAvatar;
