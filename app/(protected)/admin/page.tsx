import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import {UserRole} from "@prisma/client";

const AdminPage = () => {

    return (
        <Card className="w-[600px]">
            <CardContent>
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="you are allowed to see this content!"/>
                </RoleGate>
            </CardContent>
        </Card>
    );
};

export default AdminPage;