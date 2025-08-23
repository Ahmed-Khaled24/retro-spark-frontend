import { Button } from "@headlessui/react";
import clsx from "clsx";
import { type FC, type ReactNode } from "react";
import { Link } from "react-router";
import { Oval } from "react-loader-spinner";

interface CustomButtonProps {
    children: ReactNode;
    buttonType?: "button" | "submit";
    variant?: "primary" | "secondary" | "success" | "plain";
    link?: string;
    className?: string;
    loading?: boolean;
    rounded?: boolean;
    outlined?: boolean;
    onClick?: () => void;
}
const CustomButton: FC<CustomButtonProps> = ({
    children,
    link,
    className,
    loading,
    rounded = false,
    outlined = false,
    buttonType = "button",
    variant = "primary",
    ...other
}) => {
    const classes = clsx(
        "text-white font-semibold text-center",
        "cursor-pointer flex gap-2 items-center justify-center px-10 py-2",
        "transition-colors duration-250 ease-in-out",
        className,
        {
            "rounded-full": rounded,
            "border-1": outlined,
            "bg-primary hover:bg-primary/75": variant === "primary",
            "bg-secondary hover:bg-secondary/75 text-black!":
                variant === "secondary",
            "bg-success hover:bg-success/75": variant === "success",
            "bg-plain hover:bg-plain/75": variant === "plain",
            "bg-primary/10 hover:bg-primary/20! text-primary! border-primary":
                outlined && variant === "primary",
            "bg-secondary/35 hover:bg-secondary/60! border-secondary text-black!":
                outlined && variant === "secondary",
            "bg-success/10 hover:bg-success/20! text-success! border-success":
                outlined && variant === "success",
            "bg-plain/10 hover:bg-plain/20! text-black/50! border-plain":
                outlined && variant === "plain",
        },
    );

    if (loading) {
        return (
            <Button className={classes} {...other} disabled={loading}>
                <Oval color="white" height={24} strokeWidth={4} />
            </Button>
        );
    }

    return link ? (
        <Link to={link} className={classes} {...other}>
            {children}
        </Link>
    ) : (
        <Button
            {...other}
            className={classes}
            disabled={loading}
            type={buttonType}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
