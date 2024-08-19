'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";
import UserButton from "@/components/auth/user-button";
import LanguagePopover from "@/components/language-popover";
import {useTranslation} from "@/app/i18n/client";

const Navbar = () => {
    const {lng} = useParams();
    const { t } = useTranslation(lng, "navbar")
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:relative md:bottom-auto md:left-auto md:right-auto">
            <p>
                {t('title')}
            </p>
            <div className="flex gap-x-2 p-2 shadow rounded-full">
                <Button
                    className="rounded-full"
                    variant={pathname === `/${lng}/client` ? "default" : "ghost"}
                    asChild
                >
                    <Link href="/client">
                        {t('client')}
                    </Link>
                </Button>
                <Button
                    className="rounded-full"
                    variant={pathname === `/${lng}/admin` ? "default" : "ghost"}
                    asChild
                >
                    <Link href="/admin">
                        {t('admin')}
                    </Link>
                </Button>
                <Button
                    className="rounded-full"
                    variant={pathname === `/${lng}/settings` ? "default" : "ghost"}
                    asChild
                >
                    <Link href="/settings">
                        {t('settings')}
                    </Link>
                </Button>
            </div>

            <div className="flex gap-x-2">
                <LanguagePopover/>

                <UserButton/>
            </div>

        </nav>
    );
};

export default Navbar;