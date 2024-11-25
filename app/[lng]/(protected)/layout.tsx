'use client'

import React from 'react';
import Navbar from "@/app/[lng]/(protected)/_components/navbar";
import {useParams, usePathname} from "next/navigation";
import {CartProvider} from "@/context/cart-context";

const ProtectedLayout:React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {lng} = useParams();
    const pathname = usePathname();

    const showNavbar = pathname !== `/${lng}/admin` && !pathname.startsWith(`/${lng}/cart`);

    return (
        <CartProvider>
            {showNavbar && <Navbar />}
            {children}
        </CartProvider>
    );
};

export default ProtectedLayout;