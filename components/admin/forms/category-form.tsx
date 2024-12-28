'use client'

import React, {useState, useTransition} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {CategorySchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {categoryMenu} from "@/actions/admin/menu-category";
import {useParams} from "next/navigation";
import {useTranslation} from "@/app/i18n/client";
import {useRestaurantContext} from "@/context/restaurant-context";

const CategoryForm = () => {
    const {lng} = useParams<{ lng: string }>();
    const {t} = useTranslation(lng, "category-form");
    const {selectedRestaurant} = useRestaurantContext();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            categoryName: "",
        }
    });

    const onSubmit = (values: z.infer<typeof CategorySchema>) => {
        if (!selectedRestaurant) {
            return;
        }

        setError("");
        setSuccess("");

        startTransition(() => {
            categoryMenu(values, selectedRestaurant.id)
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
                        name="categoryName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{`${t('categoryName')}`}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Pizza"
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
                    {`${t('add')}`}
                </Button>
            </form>
        </Form>
    );
};

export default CategoryForm;