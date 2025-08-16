import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/Login";
import Signup from "../pages/Signup";

export const router = createBrowserRouter([
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
                Component: Signup,
            },
        ],
    },
]);
