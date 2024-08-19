'use client'

import React, {useEffect, useState, useTransition} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {MenuItemSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import SelectWrapper from "@/components/select-wrapper";
import {MenuCategory, Table} from "@prisma/client";
import {getCategoriesByRestaurant} from "@/actions/admin/menu-category";
import {MenuItem} from "@/actions/admin/menu-item";
import {useParams} from "next/navigation";
import {useTranslation} from "@/app/i18n/client";

const MenuItemForm = ({selectedRestaurant}) => {
    const {lng} = useParams();
    const { t } = useTranslation(lng, "menu-item-form")

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
    const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>("");

    const form = useForm<z.infer<typeof MenuItemSchema>>({
        resolver: zodResolver(MenuItemSchema),
        defaultValues: {
            itemName: "",
            menuCategory: "",
            description: "",
            price: "",
        }
    });

    useEffect(() => {
        if (selectedRestaurant) {
            // Fetch categories for the selected restaurant
            const fetchcategories = async () => {
                const data = await getCategoriesByRestaurant(selectedRestaurant);
                setMenuCategories(data);
            };

            fetchcategories();
        }
    }, [selectedRestaurant])

    const onSubmit = (values: z.infer<typeof MenuItemSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            MenuItem(values, selectedRestaurant || "")
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
                        name="itemName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{`${t('itemName')}`}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Spaghetti"
                                        type="text"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="menuCategory"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <SelectWrapper
                                        items={menuCategories.map(category => ({
                                            id: category.id,
                                            label: category.name
                                        }))}
                                        placeholder={`${t('categorySelect')}`}
                                        selectLabel="Categories"
                                        onChange={(value) => field.onChange(value)}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{`${t('description')}`}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Spaghetti is a long, thin, solid, cylindrical pasta."
                                        type="text"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{`${t('price')}`}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="8.99 $"
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
                    {`${t('create')}`}
                </Button>
            </form>
        </Form>
    );
};

export default MenuItemForm;