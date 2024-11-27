import React from 'react';
import { ImSpoonKnife } from "react-icons/im";
import { FaChair, FaLock } from "react-icons/fa6";
import { SlBasket } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserButton from "@/components/auth/user-button";
import { useTranslation } from "@/app/i18n/client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCartContext } from "@/context/cart-context";

const BottomNavbar = () => {
    const { lng } = useParams();
    const { t } = useTranslation(lng, "navbar");
    const session = useSession();
    const userId = session.data?.user?.id;
    const { cart } = useCartContext();

    const navItems = [
        { href: "/menu", icon: <ImSpoonKnife className="w-4 h-4 mb-1" />, label: t('menu') },
        { href: "/book-a-table", icon: <FaChair className="w-4 h-4 mb-1" />, label: t('bookATable') },
        { href: "/admin", icon: <FaLock className="w-4 h-4 mb-1" />, label: "Admin" },
        {
            href: userId ? `/${lng}/cart?userId=${userId}` : `/${lng}/cart`,
            icon: (
                <div className="relative">
                    <SlBasket className="h-4 w-4 mb-1" />
                    {cart.totalQuantity > 0 && (
                        <span className="absolute -top-2 right-2 bg-neutral-800 text-white text-xs rounded-full px-1">
                            {cart.totalQuantity}
                        </span>
                    )}
                </div>
            ),
            label: "Basket"
        },
    ];

    return (
        <div className="z-50 flex justify-evenly items-center w-full bg-white border-transparent navbar-container shadow-inner h-[68px]">
            {navItems.map(({ href, icon, label }, index) => (
                <Button key={index} variant="ghost" size="sm" asChild>
                    <Link className="flex flex-col h-full rounded-none items-center" href={href}>
                        {icon}
                        {label}
                    </Link>
                </Button>
            ))}
            <UserButton />
        </div>
    );
};

export default BottomNavbar;