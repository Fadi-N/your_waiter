'use client'

import React from 'react';
import { Button } from "@/components/ui/button";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import UserButton from "@/components/auth/user-button";
import { useTranslation } from "@/app/i18n/client";
import { SlBasket } from "react-icons/sl";
import { useSession } from "next-auth/react";
import { useCartContext } from "@/context/cart-context";

const Navbar = () => {
    const pathname = usePathname();
    const session = useSession();
    const { cart } = useCartContext();
    const { lng } = useParams();
    const { t } = useTranslation(lng, "navbar");
    const userId = session.data?.user?.id;

    const navItems = [
        { href: "/menu", label: t('menu') },
        { href: "/book-a-table", label: t('bookATable') },
        { href: "/client", label: t('client') },
        { href: "/admin", label: t('admin') },
    ];

    const isActive = (href: string) => pathname === `/${lng}${href}` ? "text-gray-900 font-medium" : "text-gray-500";

    return (
        <nav className="z-50 flex justify-center items-center w-full h-auto bg-white shadow mb-6">
            <div className="flex flex-row flex-nowrap items-center justify-center w-full gap-4 h-[60px] mx-2">
                <div className="flex flex-grow justify-start items-center">
                    <p className="hidden md:block">{t('title')}</p>
                </div>

                {/* Nawigacja */}
                <div className="flex flex-row items-center justify-center border rounded-full px-2">
                    {navItems.map(({ href, label }) => (
                        <Button
                            key={href}
                            variant="link"
                            asChild
                            className={`w-full rounded-full font-light hover:text-gray-900 ${isActive(href)}`}
                        >
                            <Link href={href}>{label}</Link>
                        </Button>
                    ))}
                </div>

                {/* Koszyk i użytkownik */}
                <div className="flex flex-grow items-center justify-end gap-4">
                    <Button variant="outline" size="icon" className="relative rounded-full" asChild>
                        <Link href={userId ? `/${lng}/cart?userId=${userId}` : `/${lng}/cart`}>
                            <div className="relative">
                                <SlBasket className="h-4 w-4" />
                                {cart.totalQuantity > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-neutral-800 text-white text-xs rounded-full px-1">
                                        {cart.totalQuantity}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </Button>
                    <UserButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;