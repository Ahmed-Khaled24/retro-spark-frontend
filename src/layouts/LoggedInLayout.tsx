import { Outlet } from "react-router-dom";
import { LoggedInNavbar } from "./Nav";

const LoggedInLayout = () => {
    return (
        <main className="flex w-full h-full">
            <LoggedInNavbar />
            <div className="flex-1 w-full h-full bg-background p-8">
                <Outlet />
            </div>
        </main>
    );
};

export default LoggedInLayout;
