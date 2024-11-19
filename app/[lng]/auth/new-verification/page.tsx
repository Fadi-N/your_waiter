import React from 'react';
import NewVerificationForm from "@/components/auth/new-verification-form";
import Image from "next/image";
import LoginForm from "@/components/auth/login-form";

const NewVerificationPage = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex w-screen h-screen">
                <div className="hidden lg:flex w-1/2 p-2">
                    <Image
                        className="rounded-xl"
                        width={1920}
                        height={300}
                        src={`/assets/new-verification-bg.jpg`}
                        alt="login-bg"
                    />
                </div>
                <div className="flex w-full items-center justify-center lg:w-1/2">
                    <NewVerificationForm/>
                </div>
            </div>
        </div>

)
    ;
};

export default NewVerificationPage;