import { type FC, type ReactNode } from "react";

interface EmptyStateProps {
    imageUrl: string;
    message: string;
    children?: ReactNode;
}

const EmptyState: FC<EmptyStateProps> = ({ imageUrl, message, children }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-4 max-h-full">
            <img
                src={imageUrl}
                alt="Empty state"
                className="max-w-sm w-full h-auto min-h-0"
            />
            <p className="text-xl text-gray-600">{message}</p>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
};

export default EmptyState;
