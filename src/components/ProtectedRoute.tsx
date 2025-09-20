import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "../features/auth/AuthApi";
import OvalLoader from "./OvalLoader";

const ProtectedRoute = () => {
    const { data: user, isLoading, isError } = useGetCurrentUserQuery();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-screen h-screen">
                <OvalLoader size={80} />
            </div>
        );
    }

    if (isError || !user) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
