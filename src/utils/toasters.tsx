import { toast, type ToastPosition } from "react-hot-toast";
import { PiWarningFill } from "react-icons/pi";
import { FaInfo } from "react-icons/fa6";

export const successToast = (
    message: string,
    position: ToastPosition = "bottom-right",
    duration?: number,
) =>
    toast.success(message, {
        iconTheme: {
            primary: "white",
            secondary: "rgb(40, 167, 69)",
        },
        style: {
            backgroundColor: "rgb(40, 167, 69)",
            color: "white",
            fontWeight: "bold",
        },
        position: position as ToastPosition,
        duration,
    });

export const errorToast = (
    message: string,
    position: ToastPosition = "bottom-right",
    duration?: number,
) =>
    toast.error(message, {
        iconTheme: {
            primary: "white",
            secondary: "rgb(255, 0, 0)",
        },
        style: {
            backgroundColor: "rgba(255, 0, 0)",
            color: "white",
            fontWeight: "bold",
        },
        position,
        duration,
    });

export const warningToast = (
    message: string,
    position: ToastPosition = "bottom-right",
    duration?: number,
) => {
    toast(message, {
        icon: <PiWarningFill size={20} />,
        position,
        duration,
    });
};

export const infoToast = (
    message: string,
    position: ToastPosition = "bottom-right",
    duration?: number,
) => {
    toast(message, {
        icon: <FaInfo size={20} />,
        position,
        duration,
    });
};
