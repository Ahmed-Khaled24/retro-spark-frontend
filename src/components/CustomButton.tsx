import { Button } from "@headlessui/react";
import clsx from "clsx";
import { type FC, type ReactNode } from "react";
import { Link } from "react-router";
import { Oval } from "react-loader-spinner";

interface CustomButtonProps {
    children: ReactNode;
    buttonType?: "button" | "submit";
    link?: string;
    className?: string;
    loading?: boolean;
    rounded?: boolean;
    onClick?: () => void;
}
const CustomButton: FC<CustomButtonProps> = ({
    children,
    link,
    className,
    loading,
    rounded = false,
    buttonType = "button",
    ...other
}) => {
    const classes = clsx(
        "text-white font-semibold text-center",
        "bg-primary cursor-pointer flex gap-2 items-center justify-center px-10 py-2",
        "hover:bg-primary/75 transition-colors duration-300 ease-in-out",
        className,
        {
            "rounded-full": rounded,
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
