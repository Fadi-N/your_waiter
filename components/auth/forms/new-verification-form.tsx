'use client'

import React, {useCallback, useEffect, useState} from 'react';
import CardWrapper from "@/components/auth/card-wrapper";
import {BeatLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {newVerification} from "@/actions/auth/new-verification";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const NewVerificationForm = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token!");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success || "");
                setError(data.error || "");
            })
            .catch(() => {
                setError("Something went wrong!");
            })
    }, [token])


    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    return (
        <div className="flex items-center justify-center">
            <CardWrapper
                headerLabel="Confirming your verification"
                backButtonHref="/auth/login"
            >
                <div className="flex items-center justify-center w-full">
                    {!success && !error && (
                        <BeatLoader/>
                    )}
                    <FormSuccess message={success}/>
                    <FormError message={error}/>
                </div>
            </CardWrapper>
        </div>
    );
};

export default NewVerificationForm;