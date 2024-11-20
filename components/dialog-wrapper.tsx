'use client'

import React from 'react';
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoAddOutline } from "react-icons/io5";

interface DialogWrapperProps {
    triggerLabel: string;
    triggerIcon?: React.ReactNode;
    headerLabel: string;
    description: string;
    children: React.ReactNode;
    dialogClassName?: string;
}

const DialogWrapper = (
    { triggerLabel, triggerIcon, headerLabel, description, children, dialogClassName = "sm:max-w-[425px] max-h-[90vh] overflow-y-auto" }
        : DialogWrapperProps
) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="justify-start w-full"
                    variant="default"
                    size="sm"
                >
                    {triggerIcon && <span className="me-2">{triggerIcon}</span>}
                    {triggerLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className={dialogClassName}>
                <DialogHeader>
                    <DialogTitle>{headerLabel}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <hr />
                <div className="overflow-y-auto max-h-[70vh]">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogWrapper;
