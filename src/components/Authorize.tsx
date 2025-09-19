import { type FC, type ReactNode } from "react";

interface AuthorizeProps {
    children: ReactNode;
    allowedRoles: string[];
    currentRole: string;
}
const Authorize: FC<AuthorizeProps> = ({
    children,
    currentRole,
    allowedRoles,
}) => {
    if (allowedRoles.includes(currentRole)) return children;
    else return null;
};

export default Authorize;
