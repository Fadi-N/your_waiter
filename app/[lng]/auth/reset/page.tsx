import React from 'react';
import ResetForm from "@/components/auth/forms/reset-form";
import Image from "next/image";

const ResetPage = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex w-screen h-screen">
                <div className="hidden lg:flex w-1/2 p-2">
                    <Image
                        className="rounded-xl"
                        width={1920}
                        height={300}
                        src={`/assets/password-bg.jpg`}
                        alt="login-bg"
                    />
                </div>
                <div className="flex w-full items-center justify-center lg:w-1/2">
                    <ResetForm/>
                </div>
            </div>
        </div>

    );
};

export default ResetPage;