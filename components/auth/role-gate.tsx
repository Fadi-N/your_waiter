'use client'

import React from 'react';
import {UserRole} from "@prisma/client";
import {useCurrentRole} from "@/hooks/use-current-role";
import FormError from "@/components/form-error";

interface RoleGateProps {
    children: React.ReactNode,
    allowedRole: UserRole
}

const RoleGate = ({children, allowedRole}: RoleGateProps) => {
    const role = useCurrentRole();

    return (
        <>
            {role !== allowedRole
                ? <FormError message="You dont have permission to view this content!"/>
                : <>{children}</>
            }
        </>
    );
};

export default RoleGate;