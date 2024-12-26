'use client'

import React, {useState, useTransition} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {CreateNewWorksheetSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {createNewWorksheet} from "@/actions/admin/create-new-worksheet";
import FloatingInput from "@/components/ui/floating-input";

interface NewWorksheetFormProps {
    selectedRestaurant: string;
    onWorksheetCreated?: () => void;
}

const NewWorksheetForm = ({selectedRestaurant, onWorksheetCreated}: NewWorksheetFormProps) => {
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
            createNewWorksheet(values, selectedRestaurant)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                    onWorksheetCreated?.();
                })
        });
    };

    return (
        <Form {...form}>
            <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="worksheetName"
                    render={({field}) => (
                        <FormItem>
                            <FloatingInput
                                id="worksheetName"
                                label="Worksheet name"
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

export default NewWorksheetForm;