'use client'

import React, {useState, useTransition} from 'react';
import CardWrapper from "@/components/auth/card-wrapper";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {register} from "@/actions/auth/register";
import FloatingInput from "@/components/ui/floating-input";

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            surname: ""
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        })
    }

    return (
        <CardWrapper
            headerLabel="Sign Up"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form
                    className="flex flex-col space-y-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                >

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

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FloatingInput
                                    id="password"
                                    label="Password"
                                    type="password"
                                    disabled={isPending}
                                    field={field}
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FloatingInput
                                    id="name"
                                    label="Name"
                                    type="text"
                                    disabled={isPending}
                                    field={field}
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="surname"
                        render={({field}) => (
                            <FormItem>
                                <FloatingInput
                                    id="surname"
                                    label="Surname"
                                    type="text"
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
                        size="sm"
                    >
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default RegisterForm;