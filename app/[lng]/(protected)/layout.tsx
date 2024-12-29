'use client'

import React from 'react';
import Navbar from "@/app/[lng]/(protected)/_components/navbar";
import {useParams, usePathname} from "next/navigation";
import {CartProvider} from "@/context/cart-context";
import {useMediaQuery} from "@/hooks/use-media-query";
import BottomNavbar from "@/app/[lng]/(protected)/_components/bottom-navbar";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {lng, restaurantId} = useParams();
    const pathname = usePathname();

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const showNavbar = !pathname.startsWith(`/${lng}/admin`) && !pathname.startsWith(`/${lng}/${restaurantId}/cart`);

    return (
        <CartProvider>
            {showNavbar && isDesktop && <Navbar/>}
            <div className="flex flex-col justify-between h-full">
                {children}
                {/*{!isDesktop && <BottomNavbar/>}*/}
            </div>
        </CartProvider>
    );
};

export default ProtectedLayout;