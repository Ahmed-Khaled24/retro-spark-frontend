import clsx from "clsx";
import { type FC } from "react";

interface BadgeProps {
    variant?: "primary" | "secondary" | "success";
    content: string;
    extraClasses?: string;
}
const Badge: FC<BadgeProps> = ({
    variant = "primary",
    content,
    extraClasses,
}) => {
    const badgeClasses = clsx(
        "text-xs border-1 px-3 py-0.5 rounded-full leading-[1.5]",
        {
            "border-secondary text-primary bg-secondary/10":
                variant === "secondary",
            "border-primary text-primary bg-primary/10 ": variant === "primary",
            "border-success text-success bg-success/10 ": variant === "success",
        },
        extraClasses,
    );
    return <span className={badgeClasses}>{content}</span>;
};

export default Badge;
