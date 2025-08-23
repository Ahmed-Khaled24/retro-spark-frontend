import { Button, Dialog, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import { type FC, type ReactNode } from "react";
import { IoClose } from "react-icons/io5";

export interface ModalProps {
    isOpen: boolean;
    toggleOpen: (newState?: boolean) => void;
    size?: "sm" | "md" | "lg";
    title?: string;
    wrapperClasses?: string;
    children: ReactNode;
}
export const Modal: FC<ModalProps> = ({
    isOpen,
    toggleOpen,
    children,
    wrapperClasses,
    title,
    size = "md",
}) => {
    const classes = clsx(
        "bg-white rounded-2xl",
        {
            "w-[500px]": size === "sm",
            "w-[600px]": size === "md",
            "w-[700px]": size === "lg",
        },
        wrapperClasses,
    );

    return (
        <Dialog
            className="relative z-50 transition data-closed:opacity-0 duration-200"
            open={isOpen}
            onClose={() => toggleOpen(false)}
            transition
        >
            <div className="w-screen h-screen fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center">
                <DialogPanel className={classes}>
                    {title && (
                        <header className="flex justify-between items-center p-4">
                            <h1 className="font-pacifico! text-2xl">{title}</h1>
                            <Button
                                className="rounded-full w-10 h-10 hover:bg-gray-200 flex items-center justify-center transition-colors ease-in-out duration-300 cursor-pointer"
                                onClick={() => toggleOpen(false)}
                            >
                                <IoClose size={24} />
                            </Button>
                        </header>
                    )}
                    {children}
                </DialogPanel>
            </div>
        </Dialog>
    );
};
