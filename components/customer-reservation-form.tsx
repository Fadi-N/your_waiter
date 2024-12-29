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
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {format, startOfDay} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {Textarea} from "@/components/ui/textarea";
import {useRestaurantContext} from "@/context/restaurant-context";
import FloatingInput from "@/components/ui/floating-input";

const CustomerReservationForm = () => {
    const {lng} = useParams<{ lng: string }>();
    const {t} = useTranslation(lng, "category-form");

    const [date, setDate] = useState<Date>();
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
       /* if (!selectedRestaurant) {
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
        });*/
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col space-y-2"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="categoryName"
                    render={({field}) => (
                        <FormItem>
                            <FloatingInput
                                id="name"
                                label="Name"
                                type="name"
                                disabled={isPending}
                                field={field}
                            />
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryName"
                    render={({field}) => (
                        <FormItem>
                            <FloatingInput
                                id="surname"
                                label="Surname"
                                type="surname"
                                disabled={isPending}
                                field={field}
                            />
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryName"
                    render={({field}) => (
                        <FormItem>
                            <FloatingInput
                                id="phone"
                                label="Phone"
                                type="phone"
                                disabled={isPending}
                                field={field}
                            />
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal gap-2",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon/>
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < startOfDay(new Date())}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                <Textarea placeholder="Type your note here." />

                <FormError message={error}/>
                <FormSuccess message={success}/>
                {/*<Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    {`${t('add')}`}
                </Button>*/}
            </form>
        </Form>
    );
};

export default CustomerReservationForm;