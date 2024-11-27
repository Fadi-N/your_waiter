'use client'

import React from 'react';
import Navbar from "@/app/[lng]/(protected)/_components/navbar";
import {useParams, usePathname} from "next/navigation";
import {CartProvider} from "@/context/cart-context";
import {useMediaQuery} from "@/hooks/use-media-query";
import BottomNavbar from "@/app/[lng]/(protected)/_components/bottom-navbar";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {lng} = useParams();
    const pathname = usePathname();

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const showNavbar = pathname !== `/${lng}/admin` && !pathname.startsWith(`/${lng}/cart`);

    return (
        <CartProvider>
            {showNavbar && isDesktop && <Navbar/>}
            <div className="flex flex-col justify-between h-screen">
                {children}
                {!isDesktop && <BottomNavbar/>}
            </div>
        </CartProvider>
    );
};

export default ProtectedLayout;