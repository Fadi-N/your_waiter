'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import Link from "next/link";
import UserButton from "@/components/auth/user-button";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:relative md:bottom-auto md:left-auto md:right-auto">
            <p>
                Your Waiter
            </p>
            <div className="flex gap-x-2 p-2 shadow rounded-full">
                <Button
                    className="rounded-full"
                    variant={pathname === "/client" ? "default" : "ghost"}
                    asChild
                >
                    <Link href="/client">
                        Client
                    </Link>
                </Button>
                <Button
                    className="rounded-full"
                    variant={pathname === "/admin" ? "default" : "ghost"}
                    asChild
                >
                    <Link href="/admin">
                        Admin
                    </Link>
                </Button>
                <Button
                    className="rounded-full"
                    variant={pathname === "/settings" ? "default" : "ghost"}
                    asChild
                >
                    <Link href="/settings">
                        Settings
                    </Link>
                </Button>
            </div>


            <UserButton/>

        </nav>
    );
};

export default Navbar;