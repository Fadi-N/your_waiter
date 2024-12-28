'use client'

import React, {useState, useTransition} from 'react';
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {MenuItemSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import SelectWrapper from "@/components/wrappers/select-wrapper";
import {MenuCategory} from "@prisma/client";
import {MenuItem} from "@/actions/admin/menu-item";
import {useParams} from "next/navigation";
import {useTranslation} from "@/app/i18n/client";
import ImageUpload from "@/components/image-upload";
import FloatingInput from "@/components/ui/floating-input";

interface MenuItemFormProps {
    restaurantId: string;
    menuCategories: MenuCategory[];
}

const MenuItemForm = ({restaurantId, menuCategories}: MenuItemFormProps) => {
    const {lng} = useParams<{ lng: string }>();
    const {t} = useTranslation(lng, "menu-item-form")

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof MenuItemSchema>>({
        resolver: zodResolver(MenuItemSchema),
        defaultValues: {
            itemName: "",
            menuCategory: "",
            description: "",
            price: "",
            imageUrl: "",
        }
    });

    const onSubmit = (values: z.infer<typeof MenuItemSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            MenuItem(values, restaurantId || "")
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
                <div className="flex space-x-4">
                    <div>
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value}
                                            onChange={(url) => field.onChange(url)}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-1 flex-col space-y-2 justify-center">
                        <FormField
                            control={form.control}
                            name="itemName"
                            render={({field}) => (
                                <FormItem>
                                    <FloatingInput
                                        id="itemName"
                                        label={`${t('itemName')}`}
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

                        {/*<FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FloatingInput
                                        id="description"
                                        label={`${t('description')}`}
                                        type="text"
                                        disabled={isPending}
                                        field={field}
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />*/}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => (
                                <FormItem>
                                    <FloatingInput
                                        id="price"
                                        label={`${t('price')}`}
                                        type="text"
                                        disabled={isPending}
                                        field={field}
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
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