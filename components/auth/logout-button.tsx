'use client'

import React from "react";
import {logout} from "@/actions/auth/logout";

interface LogoutButtonProps {
    children?: React.ReactNode
}

const LogoutButton = ({children}: LogoutButtonProps) => {
    const onClick = () => {
        logout();
    }

    return (
        <span
            className="cursor-pointer"
            onClick={onClick}
        >
            {children}
        </span>
    );
};

export default LogoutButton;