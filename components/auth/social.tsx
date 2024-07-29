'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import {FaGoogle} from "react-icons/fa";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {signIn} from "next-auth/react";

const Social = () => {
    const onClick = () =>{
        signIn("google", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={onClick}
            >
                <FaGoogle className="h-5 w-5"/>
            </Button>
        </div>
    );
};

export default Social;