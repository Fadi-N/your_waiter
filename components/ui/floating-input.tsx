import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import React from "react";

interface FloatingInputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    field?: {
        value?: string;
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
    className?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}


const FloatingInput = ({ id, label, type = "text", disabled, field = {} } : FloatingInputProps) => {
    console.log("FIELD: ", field)

    return (
        <div className="relative group mb-2" data-filled={!!field.value}>
            <Input
                {...field}
                id={id}
                type={type}
                placeholder=" "
                className="peer focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-transparent px-2.5 pt-7 pb-4 border border-gray-300 rounded-xl w-full text-sm"
                disabled={disabled}
            />
            <Label
                htmlFor={id}
                className="absolute left-2.5 top-2.5 text-sm text-gray-500 duration-300 transform origin-left peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-2 peer-focus:scale-75 group-data-[filled=true]:-translate-y-2 group-data-[filled=true]:scale-75"
            >
                {label}
            </Label>
        </div>
    );
};

export default FloatingInput;