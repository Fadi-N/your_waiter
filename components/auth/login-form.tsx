'use client'

import React, {useState, useTransition} from 'react';
import CardWrapper from "@/components/auth/card-wrapper";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {login} from "@/actions/auth/login";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import FloatingInput from "@/components/ui/floating-input";

const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : ""

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        })
    }

    return (
        <CardWrapper
            headerLabel="Log In"
            backButtonHref="/auth/register"
            showSocial
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

                                <div className="flex items-center justify-between w-full py-2">
                                    <p>
                                        Remember me
                                    </p>
                                    <Button
                                        variant="link"
                                        className="px-0 font-normal"
                                        size="sm"
                                        asChild
                                    >
                                        <Link href="/auth/reset">
                                            Forgot password?
                                        </Link>
                                    </Button>
                                </div>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button
                        type="submit"
                        className="w-full"
                        size="sm"
                        disabled={isPending}
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default LoginForm;