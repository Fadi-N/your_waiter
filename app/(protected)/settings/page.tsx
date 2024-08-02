'use client'

import {useSession} from "next-auth/react";
import {logout} from "@/actions/logout";
import {useCurrentUser} from "@/hooks/use-current-user";

const SettingsPage = () => {
    const user = useCurrentUser();

    const onClick = () => {
        logout();
    }

    return (
        <div className="m-6">
            Settings
        </div>
    );
};

export default SettingsPage;