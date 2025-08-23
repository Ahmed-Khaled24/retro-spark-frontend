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
    itemsClassName?: string;
}

const Dropdown: FC<DropdownProps> = ({
    items,
    anchor,
    menuClassName,
    mainButtonContent,
    itemsClassName,
}) => {
    const className = clsx(
        menuClassName,
        "flex flex-col rounded-lg border-1 border-primary-border focus-visible:outline-none",
        "transition duration-100 data-closed:scale-50 data-closed:opacity-0",
    );

    const generateItemClassName = (item: DropdownItem) => {
        const isString = typeof item.content === "string";
        return clsx(
            "hover:bg-gray-100 cursor-pointer",
            {
                "px-6": isString,
                "py-2": isString,
            },
            itemsClassName,
        );
    };

    return (
        <Menu>
            <MenuButton className="cursor-pointer focus-visible:outline-none">
                {mainButtonContent}
            </MenuButton>
            <MenuItems transition className={className} anchor={anchor}>
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
