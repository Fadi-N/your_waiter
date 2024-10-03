'use client'

import React from 'react';
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator,
    DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import {useCurrentUser} from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";
import {IoExitOutline, IoLanguage} from "react-icons/io5";
import {languages} from "@/app/i18n/settings";
import Link from "next/link";
import Image from "next/image";
import {useParams, usePathname} from "next/navigation";

const UserButton = () => {
    const user = useCurrentUser();
    const {lng} = useParams();
    const pathname = usePathname();
    const trimmedPath = pathname.replace(`/${lng}/`, '');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""}/>
                    <AvatarFallback className="bg-slate-100">
                        <FaUser className="w-4 h-4"/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <IoLanguage className="mr-2 h-4 w-4" />
                        <span>Languages</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {languages.map((language, index) => (
                                    <DropdownMenuCheckboxItem key={language} checked={lng === language}>
                                        <Link
                                            href={`/${language}/${trimmedPath}`}
                                            className="flex"
                                        >
                                            <Image
                                                className="me-2"
                                                src={`/assets/${language}.png`}
                                                alt={`${lng}`}
                                                width={20}
                                                height={20}
                                            />
                                            {language.toUpperCase()}
                                        </Link>
                                    </DropdownMenuCheckboxItem>
                                ))
                            }
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <LogoutButton>
                    <DropdownMenuItem>
                        <IoExitOutline className="h-4 w-4 mr-2"/>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserButton;