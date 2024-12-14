'use client'

import React, {useState, useTransition} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {CreateNewWorksheetSchema, CreateRestaurantWithQRCodeSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {createRestaurantWithQRCode} from "@/actions/admin/create-restaurant-with-qrcode";
import {useCurrentUser} from "@/hooks/use-current-user";
import {createNewWorksheet} from "@/actions/admin/create-new-worksheet";

const NewWorksheetForm = () => {
    const user = useCurrentUser();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CreateNewWorksheetSchema>>({
        resolver: zodResolver(CreateNewWorksheetSchema),
        defaultValues: {
            worksheetName: "",
        }
    });

    const onSubmit = (values: z.infer<typeof CreateNewWorksheetSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            createNewWorksheet(values, user?.id || "")
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        });
    };

    return (
        <Form {...form}>
            <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="worksheetName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Restaurant Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Floor 1"
                                        type="text"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
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

export default NewWorksheetForm;