import React from 'react';
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";

interface DrawerWrapperProps {
    triggerLabel?: string;
    triggerIcon?: React.ReactNode;
    headerLabel?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

const DrawerWrapper = (
    {triggerLabel, triggerIcon, headerLabel, description, children, className}: DrawerWrapperProps
) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="ghost" onClick={() => setOpen(true)}>
                    {triggerIcon}
                    {triggerLabel}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className={className}>
                    <DrawerTitle>{headerLabel}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <hr className="mx-4"/>
                <div className="p-4">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerWrapper;