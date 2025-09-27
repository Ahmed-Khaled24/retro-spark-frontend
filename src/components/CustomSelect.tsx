import {
    Field,
    Label,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import clsx from "clsx";
import { type FC } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

export interface CustomSelectOption {
    id: number | string;
    content: string;
}
export interface CustomSelectProps {
    label?: string;
    options: CustomSelectOption[];
    value: CustomSelectOption;
    onChange: (newValue: CustomSelectOption) => void;
    mainButtonExtraClasses?: string;
    menuItemsExtraClasses?: string;
}

const CustomSelect: FC<CustomSelectProps> = ({
    label,
    options,
    value,
    mainButtonExtraClasses,
    menuItemsExtraClasses,
    onChange,
}) => {
    const mainButtonClasses = clsx(
        mainButtonExtraClasses,
        "flex items-center",
        "border-primary-border border-1",
        "p-3 rounded-lg cursor-pointer text-sm",
    );

    const menuItemsClasses = clsx(
        menuItemsExtraClasses,
        "bg-white rounded-lg border-1 border-primary-border mt-1 w-(--button-width) shadow-lg",
        "transition duration-200 data-closed:translate-y-10 data-closed:opacity-0",
    );

    return (
        <Field className="flex flex-col gap-1 w-full">
            {label && <Label>{label}</Label>}
            <Menu>
                {({ open }) => (
                    <>
                        <MenuButton className={mainButtonClasses}>
                            <span>{value.content}</span>
                            <MdKeyboardArrowLeft
                                size={18}
                                className={clsx("ml-auto", {
                                    "-rotate-90": open,
                                })}
                            />
                        </MenuButton>
                        <MenuItems
                            transition
                            anchor="bottom start"
                            className={menuItemsClasses}
                        >
                            {options.map((option) => (
                                <MenuItem key={option.id}>
                                    <div
                                        onClick={() => onChange(option)}
                                        className="py-2 px-4 cursor-pointer data-focus:bg-primary/10 text-sm"
                                    >
                                        {option.content}
                                    </div>
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </>
                )}
            </Menu>
        </Field>
    );
};

export default CustomSelect;
