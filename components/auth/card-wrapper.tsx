'use client'

import React from 'react';
import {
    Card, CardContent, CardFooter, CardHeader,
} from "@/components/ui/card"
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";
import BackButton from "@/components/auth/back-button";

interface CardWrapperProps{
    children: React.ReactNode;
    headerLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

const CardWrapper = ({children, backButtonHref, headerLabel, showSocial} : CardWrapperProps) => {
    return (
        <Card className="flex justify-center items-center w-full max-w-sm flex-col gap-4 rounded-lg border-0 shadow-none">
            <CardHeader className="pb-0">
                {/*<Header
                    label={headerLabel}
                />*/}
                <p className="pb-2 text-xl font-medium">{headerLabel}</p>
            </CardHeader>
            <CardContent className="pb-2">
                {children}
            </CardContent>
            {showSocial && (
                <>
                    <div className="flex items-center justify-between px-6 pb-2">
                        <hr className="border border-gray-300 w-full" />
                        <p className="text-xs mx-2">OR</p>
                        <hr className="border border-gray-300 w-full" />
                    </div>
                    <CardFooter className="pb-0">
                        <Social/>
                    </CardFooter>
                </>
            )}
            <CardFooter>
                <BackButton
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>

    );
};

export default CardWrapper;