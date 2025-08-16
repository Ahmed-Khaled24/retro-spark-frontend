import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import LoggedInLayout from "../layouts/LoggedInLayout";
import BoardsGridPage from "../pages/BoardsGrid";

export const router = createBrowserRouter([
    {
        path: "/app",
        Component: LoggedInLayout,
        children: [
            {
                index: true,
                Component: BoardsGridPage,
            },
            {
                path: "/app/teams",
                Component: () => <div>Teams Page</div>, // Placeholder for Teams page
            },
            {
                path: "/app/settings",
                Component: () => <div>Settings Page</div>, // Placeholder for Settings page
            },
        ],
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: LoginPage,
            },
            {
                path: "signup",
                Component: SignupPage,
            },
        ],
    },
]);
