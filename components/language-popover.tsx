import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {languages} from "@/app/i18n/settings";
import {useParams} from "next/navigation";
import Link from "next/link";

const LanguagePopover = () => {
    const {lng} = useParams();

    const uppercaseLng = typeof lng === "string" && lng?.toUpperCase();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="rounded-full"
                >
                    {uppercaseLng}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
                <div className="grid gap-2">
                    {languages
                        .filter((language) => lng !== language)
                        .map((language, index) => (
                            <span key={language}>
                                <Link href={`/${language}/admin`}>
                                    {language}
                                </Link>
                            </span>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default LanguagePopover;