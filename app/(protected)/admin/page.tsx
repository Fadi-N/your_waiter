import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import {UserRole} from "@prisma/client";
import GenerateQrcodeForm from "@/components/admin/generate-qrcode-form";

const AdminPage = () => {

    return (
        <Card className="w-[600px] mt-6">
            <CardContent className="p-6">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <GenerateQrcodeForm/>
                </RoleGate>
            </CardContent>
        </Card>
    );
};

export default AdminPage;