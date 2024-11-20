'use client'

import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectWrapperProps {
    items: { id: string, label: string }[];
    placeholder: string;
    selectLabel: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    triggerClassName?: string;
}

const SelectWrapper = (
    {items, placeholder, selectLabel, onChange, defaultValue, triggerClassName = "w-auto bg-transparent rounded-xl focus:ring-offset-0 focus:ring-0 font-light text-gray-500 hover:text-gray-900"}
        : SelectWrapperProps
) => {
    return (
        <Select onValueChange={onChange} defaultValue={defaultValue}>
            <SelectTrigger className={triggerClassName}>
                <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{selectLabel}</SelectLabel>
                    {items.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectWrapper;
