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
import {Table as TableFromPrisma} from "@prisma/client";
import TableList from "@/components/admin/table-list";

interface EditRestaurantFormProps {
    selectedRestaurant: string;
    tables: TableFromPrisma[];
}

const EditRestaurantForm = ({selectedRestaurant, tables}: EditRestaurantFormProps) => {
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
        <>
            {selectedRestaurant ? (
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="restaurantName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Restaurant Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Your waiter"
                                                type="text"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <TableList selectedRestaurant={selectedRestaurant} tables={tables}/>
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <div className="flex gap-x-2">
                            <Button
                                type="submit"
                                variant="destructive"
                                className="flex-1"
                                disabled={isPending}
                            >
                                Delete Restaurant
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
            ) : (
                <p>Please select a restaurant to Edit.</p>
            )}
        </>

    );
};

export default EditRestaurantForm;