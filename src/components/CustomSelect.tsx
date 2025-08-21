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

interface CustomSelectProps {
    label?: string;
    options: string[];
    value: string;
    onChange: (newValue: string) => void;
}

const CustomSelect: FC<CustomSelectProps> = ({
    label,
    options,
    value,
    onChange,
}) => {
    return (
        <Field className="flex flex-col gap-2 w-full">
            {label && <Label>{label}</Label>}
            <Menu>
                {({ open }) => (
                    <>
                        <MenuButton className="flex items-center border-primary-border border-1 p-3 rounded-lg cursor-pointer text-sm">
                            <span>{value}</span>
                            <MdKeyboardArrowLeft
                                size={18}
                                className={clsx("ml-auto", {
                                    "-rotate-90": open,
                                })}
                            />
                        </MenuButton>
                        <MenuItems
                            anchor="bottom start"
                            className="bg-white rounded-lg border-1 border-primary-border mt-1 w-(--button-width)"
                        >
                            {options.map((option) => (
                                <MenuItem>
                                    <div
                                        onClick={() => onChange(option)}
                                        className="py-2 px-4 cursor-pointer data-focus:bg-primary/10 text-sm "
                                    >
                                        {option}
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
