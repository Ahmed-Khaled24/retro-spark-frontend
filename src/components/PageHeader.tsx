import { type FC } from "react";

interface PageHeaderProps {
    title: string;
}
const PageHeader: FC<PageHeaderProps> = ({ title }) => {
    return (
        <div className="flex items-center">
            <h1 className="font-pacifico! text-2xl">{title}</h1>
        </div>
    );
};

export default PageHeader;
