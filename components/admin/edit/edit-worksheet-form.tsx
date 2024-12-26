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
import {createRestaurantWithQRCode} from "@/actions/admin/create-restaurant-with-qrcode";
import {deleteActiveWorksheet, updateActiveWorksheet} from "@/actions/admin/reservation";
import FloatingInput from "@/components/ui/floating-input";

interface EditWorksheetFormProps {
    restaurantId: string;
    activeWorksheet: {
        id: string;
        name: string;
        description?: string;
        restaurantId: string;
    } | null;
}

const EditRestaurantForm = ({restaurantId, activeWorksheet}: EditWorksheetFormProps) => {

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

        if (!activeWorksheet || !activeWorksheet.id) {
            setError("No active worksheet to update.");
            return;
        }

        startTransition(() => {
            updateActiveWorksheet(restaurantId, activeWorksheet?.id, values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        });
    };

    const handleDelete = () => {
        setError("");
        setSuccess("");

        if (!activeWorksheet || !activeWorksheet.id) {
            setError("No active worksheet to delete.");
            return;
        }

        startTransition(async () => {
            const result = await deleteActiveWorksheet(restaurantId, activeWorksheet?.id);
            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(result.success);
            }
        });
    };

    return (
        <>
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
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <div className="flex gap-x-2">
                        <Button
                            type="button"
                            variant="destructive"
                            className="flex-1"
                            disabled={isPending}
                            onClick={handleDelete}
                        >
                            Delete Worksheet
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={isPending}
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Form>
        </>

    );
};

export default EditRestaurantForm;