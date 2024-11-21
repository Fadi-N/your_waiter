import React, { createContext, useContext, ReactNode } from "react";
import { useCart as useCartHook } from "@/hooks/use-cart";
import {MenuItem} from "@prisma/client";

// Typ danych dla kontekstu
interface CartContextType {
    cart: {
        items: [];
        totalQuantity: number;
        total: number;
    };
    increment: (item: MenuItem) => void;
    decrement: (item: MenuItem) => void;
    updateCart: (item: MenuItem, newQuantity: number) => void;
}

// Tworzenie kontekstu
const CartContext = createContext<CartContextType | undefined>(undefined);

// Komponent dostarczający kontekst
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const cart = useCartHook(); // Używamy istniejącego hooka

    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook do używania kontekstu
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
};