import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "../features/auth/AuthApi";
import { Oval } from "react-loader-spinner";

const ProtectedRoute = () => {
    const { data: user, isLoading, isError } = useGetCurrentUserQuery();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-screen h-screen">
                <Oval
                    height={80}
                    width={80}
                    color="#ff6f61"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#ff6f61"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div>
        );
    }

    if (isError || !user) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
