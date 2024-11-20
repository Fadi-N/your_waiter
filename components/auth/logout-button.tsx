'use client'

import React from "react";
import {logout} from "@/actions/auth/logout";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

interface LogoutButtonProps {
    children?: React.ReactNode
}

const LogoutButton = ({children}: LogoutButtonProps) => {
    const onClick = () => {
        logout();
    }

    return (
        <Button
            variant="default"
            className="cursor-pointer flex flex-row items-center justify-start"
            onClick={onClick}
            size="sm"
        >
            {children}
        </Button>
    /*<div
        className="cursor-pointer flex flex-row items-center justify-start"
        onClick={onClick}
    >
        {children}
    </div>*/
)
    ;
};

export default LogoutButton;