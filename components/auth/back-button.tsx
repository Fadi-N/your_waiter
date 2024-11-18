'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
    href: string;
}

const BackButton = ({href}: BackButtonProps) => {
    return (
        <>
            {href.includes('register') ? (
                <div className="flex items-center justify-center text-sm w-full">
                    <p>
                        Need to create an account?
                        <Link href={href} className="underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            ) : (
                <div className="flex items-center justify-center text-sm w-full">
                    <p>
                        Already have an account?
                        <Link href={href} className="underline">
                            Log In
                        </Link>
                    </p>
                </div>
            )}
        </>
    );
};

export default BackButton;