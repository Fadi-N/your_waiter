'use client'

import React, {useEffect, useState} from 'react';
import {ImSpoonKnife} from "react-icons/im";
import {FaChair, FaLock} from "react-icons/fa6";
import {SlBasket} from "react-icons/sl";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import UserButton from "@/components/auth/user-button";
import {useTranslation} from "@/app/i18n/client";
import {useParams} from "next/navigation";
import {useSession} from "next-auth/react";
import {useCartContext} from "@/context/cart-context";

const BottomNavbar = () => {
    const {lng} = useParams<{ lng: string }>();
    const {t} = useTranslation(lng, "navbar");
    const session = useSession();
    const userId = session.data?.user?.id;
    const {cart} = useCartContext();
    const [isMounted, setIsMounted] = useState(false);

    // Ensure client-side rendering for cart total quantity
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const navItems = [
        {href: "/menu", icon: <ImSpoonKnife className="w-4 h-4"/>, label: t('menu')},
        {href: "/book-a-table", icon: <FaChair className="w-4 h-4"/>, label: t('bookATable')},
        {href: "/admin", icon: <FaLock className="w-4 h-4"/>, label: "Admin"},
        {
            href: userId ? `/${lng}/cart?userId=${userId}` : `/${lng}/cart`,
            icon: (
                <div className="relative">
                    <SlBasket className="h-4 w-4"/>
                    {isMounted && cart.totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full px-1">
                            {cart.totalQuantity}
                        </span>
                    )}
                </div>
            ),
            label: "Basket"
        },
    ];

    return (
        <div className="flex justify-center items-center sticky bottom-0">
            <div
                className="z-50 flex justify-evenly items-center w-full h-[56px] bg-black rounded-full navbar-container mb-6 mx-8">
                {navItems.map(({href, icon, label}, index) => (
                    <React.Fragment key={`nav-item-${index}`}>
                        {index === 2 && <UserButton/>}

                        <Button className="text-white w-[40px] h-[40px] rounded-full" variant="ghost"
                                size="sm" asChild>
                            <Link className="flex flex-col rounded-full items-center" href={href}>
                                {icon}
                            </Link>
                        </Button>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default BottomNavbar;