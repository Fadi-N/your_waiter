'use client'

import React, {useCallback, useEffect, useState} from 'react';
import CardWrapper from "@/components/auth/card-wrapper";
import {BeatLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {newVerification} from "@/actions/auth/new-verification";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const NewVerificationForm = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token!");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong!");
            })
    }, [token])


    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    return (
        <CardWrapper
            headerLabel="Confirming yor verification"
            backButtonLabel="Back to login"
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
    );
};

export default NewVerificationForm;