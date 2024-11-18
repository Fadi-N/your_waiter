import React from 'react';
import RegisterForm from "@/components/auth/register-form";
import Image from "next/image";

const RegisterPage = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex w-screen h-screen">
                <div className="hidden lg:flex w-1/2">
                    <Image
                        className="rounded-tr-xl rounded-br-xl"
                        width={900}
                        height={300}
                        src={`/assets/register-bg.jpg`}
                        alt="register-bg"
                    />
                </div>
                <div className="flex w-full items-center justify-center lg:w-1/2">
                    <RegisterForm/>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;