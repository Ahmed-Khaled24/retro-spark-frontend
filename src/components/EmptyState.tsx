import { type FC, type ReactNode } from "react";

interface EmptyStateProps {
    imageUrl: string;
    message: string;
    children?: ReactNode;
}

const EmptyState: FC<EmptyStateProps> = ({ imageUrl, message, children }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-6 p-8">
            <img
                src={imageUrl}
                alt="Empty state"
                className="max-w-sm w-full h-auto"
            />
            <p className="text-xl text-gray-600">{message}</p>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
};

export default EmptyState;
