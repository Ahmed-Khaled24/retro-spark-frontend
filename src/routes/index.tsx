import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import LoggedInLayout from "../layouts/LoggedInLayout";
import BoardsPage from "../pages/Boards";
import BoardPage from "../pages/Board";
import TeamsPage from "../pages/Teams";
import TeamPage from "../pages/Team";

export const router = createBrowserRouter([
    {
        path: "/app",
        Component: LoggedInLayout,
        children: [
            {
                index: true,
                Component: BoardsPage,
            },
            {
                path: "teams",
                Component: TeamsPage,
            },
            {
                path: "settings",
                Component: () => <div>Settings Page</div>, // Placeholder for Settings page
            },
            {
                path: "board/:id",
                Component: BoardPage,
            },
            {
                path: "team/:id",
                Component: TeamPage,
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
