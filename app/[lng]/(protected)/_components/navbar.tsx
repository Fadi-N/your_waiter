'use client'

import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";
import UserButton from "@/components/auth/user-button";
import LanguagePopover from "@/components/language-popover";
import {useTranslation} from "@/app/i18n/client";
import {SlBasket} from "react-icons/sl";
import {useSession} from "next-auth/react";
import {useCart} from "@/hooks/use-cart";
import {useMediaQuery} from "@/hooks/use-media-query";
import {LiaQrcodeSolid} from "react-icons/lia";
import TableList from "@/components/admin/table-list";
import DrawerWrapper from "@/components/drawer-wrapper";
import {Table, TableBody, TableCaption, TableCell, TableFooter, TableRow} from "@/components/ui/table";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {Input} from "@/components/ui/input";

const Navbar = () => {
    const pathname = usePathname();
    const session = useSession();

    const userId = session.data?.user?.id;

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const {lng} = useParams();
    const {t} = useTranslation(lng, "navbar")
    const {cart} = useCart();

    console.log('Cart in Navbar:', cart, cart.items.length);
    useEffect(() => {
        console.log('Cart in Navbar:', cart);
    }, [cart]);

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center bg-white border-t md:border-transparent md:p-4 md:relative md:bottom-auto md:left-auto md:right-auto">
            <p className="hidden md:block">
                {t('title')}
            </p>
            <div className="flex w-full gap-x-2 p-2 shadow justify-between md:rounded-full md:w-auto">
                <Button
                    className="w-full rounded-full"
                    variant={pathname === `/${lng}/menu` ? "default" : "ghost"}
                    asChild
                >
                    <Link href="/menu">
                        {t('menu')}
                    </Link>
                </Button>
                <Button
                    className="w-full rounded-full"
                    variant={pathname === `/${lng}/menu` ? "default" : "ghost"}
                    asChild
                >
                    <Link href="/book-a-table">
                        {t('bookATable')}
                    </Link>
                </Button>
                <Button
                    className="w-full rounded-full"
                    variant={pathname === `/${lng}/client` ? "default" : "ghost"}
                    asChild
                >
                    <Link href="/client">
                        {t('client')}
                    </Link>
                </Button>
                <Button
                    className="w-full rounded-full"
                    variant={pathname === `/${lng}/admin` ? "default" : "ghost"}
                    asChild
                >
                    <Link href="/admin">
                        {t('admin')}
                    </Link>
                </Button>
                {!isDesktop && (
                    <DrawerWrapper
                        headerLabel="Cart"
                        triggerIcon={<SlBasket className="w-4 h-4 me-2"/>}
                    >

                        <Table className="mb-40">
                            <TableBody>
                                {cart.items.map((item) => (
                                    <TableRow key={item.name} className="w-full">
                                        <TableCell>
                                            <div
                                                className="bg-gray-100 h-[200px] flex items-center justify-center rounded-md md:h-auto">
                                                IMAGE
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <p className="font-bold text-xl">{item.name}</p>
                                            <p className="text text-sm">category</p>
                                            <div
                                                className="counter flex items-center justify-between border rounded-full p-2 w-full max-w-xs h-auto"
                                            >
                                                <Button
                                                    className="rounded-full border-transparent"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => decrement(item)}
                                                >
                                                    <AiOutlineMinus className="w-4 h-4"/>
                                                </Button>
                                                <Input
                                                    type="text"
                                                    value={cart.items.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
                                                    className="border-transparent text-center p-0 h-auto w-12"
                                                    size="sm"
                                                    readOnly
                                                />
                                                <Button
                                                    className="rounded-full"
                                                    variant="default"
                                                    size="icon"
                                                    onClick={() => increment(item)}
                                                >
                                                    <AiOutlinePlus className="w-4 h-4"/>
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">{item.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell className="text-right">$2,500.00</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <Button
                            className="rounded-full w-full"
                            asChild
                        >
                            <Link href={userId ? `/${lng}/cart?userId=${userId}` : `/${lng}/cart`}>
                                Checkout
                            </Link>
                        </Button>
                    </DrawerWrapper>
                )}

            </div>

            <div className="hidden md:flex gap-x-2">
                <LanguagePopover/>

                <Button
                    variant="outline"
                    size="icon"
                    className="relative rounded-full"
                    asChild
                >
                    <Link href={userId ? `/${lng}/cart?userId=${userId}` : `/${lng}/cart`}>
                        <div className="relative">
                            <SlBasket className="h-4 w-4"/>
                            <span
                                className="absolute -top-2 -right-2 bg-neutral-800 text-white text-xs rounded-full px-1"
                            >
                                {cart.items.length}
                            </span>
                        </div>
                    </Link>
                </Button>

                <UserButton/>
            </div>

        </nav>
    );
};

export default Navbar;