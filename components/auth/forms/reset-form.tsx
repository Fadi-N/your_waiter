'use client'

import React, {useState, useTransition} from 'react';
import CardWrapper from "@/components/auth/card-wrapper";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ResetSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {reset} from "@/actions/auth/reset";
import FloatingInput from "@/components/ui/floating-input";

const ResetForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        })
    }

    return (
        <CardWrapper
            headerLabel="Forgot your password?"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FloatingInput
                                    id="email"
                                    label="Email"
                                    type="email"
                                    disabled={isPending}
                                    field={field}
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                        type="submit"
                        className="w-full mt-4"
                        disabled={isPending}
                    >
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default ResetForm;