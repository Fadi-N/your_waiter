import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {languages} from "@/app/i18n/settings";
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";

const LanguagePopover = () => {
    const {lng} = useParams();
    const pathname = usePathname();
    const trimmedPath = pathname.replace(`/${lng}/`, '');

    const uppercaseLng = typeof lng === "string" && lng?.toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={`/assets/${lng}.png` || ""}/>
                    <AvatarFallback className="bg-white border text-sm">
                        {uppercaseLng}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col items-center">
                {languages
                    .filter((language) => lng !== language)
                    .map((language, index) => (
                        <DropdownMenuItem key={language}>
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
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguagePopover;