import { Outlet } from "react-router-dom";
import { PublicNavbar } from "./Nav";

const AuthLayout = () => {
    return (
        <main className="flex flex-col min-h-screen px-8 bg-background">
            <PublicNavbar />
            <div className="flex-1">
                <Outlet />
            </div>
        </main>
    );
};

export default AuthLayout;
