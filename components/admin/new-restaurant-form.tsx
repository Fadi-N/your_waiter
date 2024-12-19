'use client'

import React, {useState, useTransition} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {CreateRestaurantWithQRCodeSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {createRestaurantWithQRCode} from "@/actions/admin/create-restaurant-with-qrcode";
import {useCurrentUser} from "@/hooks/use-current-user";
import FloatingInput from "@/components/ui/floating-input";

const NewRestaurantForm = () => {
    const user = useCurrentUser();


    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CreateRestaurantWithQRCodeSchema>>({
        resolver: zodResolver(CreateRestaurantWithQRCodeSchema),
        defaultValues: {
            restaurantName: "",
            numberOfTables: "",
        }
    });

    const onSubmit = (values: z.infer<typeof CreateRestaurantWithQRCodeSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            createRestaurantWithQRCode(values, user?.id || "")
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        });
    };

    return (
        <Form {...form}>
            <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="restaurantName"
                    render={({field}) => (
                        <FormItem>
                            <FloatingInput
                                id="restaurantName"
                                label="Restaurant name"
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
                    name="numberOfTables"
                    render={({field}) => (
                        <FormItem>
                            <FloatingInput
                                id="numberOfTables"
                                label="Number of tables"
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
                    className="w-full"
                    disabled={isPending}
                >
                    Create
                </Button>
            </form>
        </Form>
    );
};

export default NewRestaurantForm;