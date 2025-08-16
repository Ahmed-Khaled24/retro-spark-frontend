import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import clsx from "clsx";
import type { FC, JSX } from "react";

interface DropdownItem {
    content: string | JSX.Element;
    onClick: () => void;
    disabled?: boolean;
}

interface DropdownProps {
    anchor:
        | "top"
        | "bottom"
        | "top start"
        | "top end"
        | "bottom start"
        | "bottom end";
    menuClassName?: string;
    mainButtonContent: string | JSX.Element;
    items: DropdownItem[];
}

const Dropdown: FC<DropdownProps> = ({
    items,
    anchor,
    menuClassName,
    mainButtonContent,
}) => {
    const className = clsx(
        menuClassName,
        "flex flex-col rounded-lg border-1 border-primary-border data-focus:outline-none",
    );

    const generateItemClassName = (item: DropdownItem) => {
        const isString = typeof item.content === "string";
        return clsx("hover:bg-gray-100 cursor-pointer", {
            "px-8": isString,
            "py-2": isString,
        });
    };

    return (
        <Menu>
            <MenuButton className="cursor-pointer">
                {mainButtonContent}
            </MenuButton>
            <MenuItems className={className} anchor={anchor}>
                {items.map((item, index) => (
                    <MenuItem key={index} disabled={item.disabled}>
                        <div
                            onClick={item.onClick}
                            className={generateItemClassName(item)}
                        >
                            {item.content}
                        </div>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
};

export default Dropdown;
