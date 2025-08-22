import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoHomeFill, GoPeople } from "react-icons/go";
import { FaGear } from "react-icons/fa6";
import clsx from "clsx";
import Dropdown from "../components/Dropdown";
import DefaultAvatar from "../components/DefaultAvatar";

export const PublicNavbar = () => {
    return (
        <nav className="flex py-4 w-12">
            <img src="/logo.svg" alt="logo" />
        </nav>
    );
};

export const LoggedInNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [links, setLinks] = useState([
        {
            icon: <GoHomeFill size={28} />,
            path: "/app",
            tooltip: "Boards",
            active: false,
        },
        {
            icon: <GoPeople size={28} />,
            path: "/app/teams",
            tooltip: "Teams",
            active: false,
        },
        {
            icon: <FaGear size={28} />,
            path: "/app/settings",
            tooltip: "Settings",
            active: false,
        },
    ]);

    useEffect(() => {
        console.log();
        setLinks((prevLinks) =>
            prevLinks.map((link) => ({
                ...link,
                active: link.path === location.pathname,
            })),
        );
    }, [location]);

    return (
        <aside className="flex flex-col py-4 px-3 h-full">
            <img
                src="/logo.svg"
                alt="logo"
                className="pb-8 border-b-1 border-primary-border w-12 mx-auto"
            />
            <nav className="flex flex-col gap-8 items-center pt-12">
                {links.map((link) => (
                    <Link
                        to={link.path}
                        key={link.path}
                        className={clsx(
                            "text-gray-500 hover:text-primary hover:bg-primary/10 p-3 rounded-lg transition-all duration-250",
                            {
                                "text-primary": link.active,
                                "bg-primary/10": link.active,
                            },
                        )}
                    >
                        {link.icon}
                    </Link>
                ))}
            </nav>
            {/* User Avatar */}
            <div className="mt-auto mx-auto">
                <Dropdown
                    menuClassName="translate-y-[-5px] bg-white"
                    mainButtonContent={
                        <DefaultAvatar
                            name="Ahmed Khaled"
                            variant="secondary"
                        />
                    }
                    items={[
                        {
                            content: "Logout",
                            onClick: () => navigate("/auth/login"),
                        },
                    ]}
                    anchor="top start"
                />
            </div>
        </aside>
    );
};
