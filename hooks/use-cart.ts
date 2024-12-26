import { useState, useEffect, useCallback } from "react";
import {MenuCategory} from "@prisma/client";

interface MenuItem {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    MenuCategory: MenuCategory;
}

interface CartItem extends MenuItem {
    quantity: number;
    total: number;
}

export const useCart = () => {
    // Inicjalizacja koszyka z localStorage
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return [];
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Obliczanie całkowitej liczby sztuk produktów w koszyku
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Obliczanie całkowitej ceny koszyka
    const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    // Zapis do localStorage przy każdej zmianie koszyka
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Funkcja aktualizująca koszyk
    const updateCart = (item: MenuItem, newQuantity: number) => {
        setCartItems((prevCart) => {
            const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);

            if (itemIndex === -1 && newQuantity > 0) {
                return [
                    ...prevCart,
                    { ...item, quantity: newQuantity, total: item.price * newQuantity },
                ];
            } else if (itemIndex !== -1) {
                const updatedCart = [...prevCart];
                if (newQuantity === 0) {
                    updatedCart.splice(itemIndex, 1);
                } else {
                    updatedCart[itemIndex] = {
                        ...updatedCart[itemIndex],
                        quantity: newQuantity,
                        total: updatedCart[itemIndex].price * newQuantity,
                    };
                }
                return updatedCart;
            }
            return prevCart;
        });
    };

    const increment = useCallback(
        (item: MenuItem) => {
            const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
            updateCart(item, (existingItem?.quantity || 0) + 1);
        },
        [cartItems]
    );

    const decrement = useCallback(
        (item: MenuItem) => {
            const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
            updateCart(item, Math.max((existingItem?.quantity || 0) - 1, 0));
        },
        [cartItems]
    );

    return {
        cart: {
            items: cartItems,
            totalQuantity: totalQuantity,
            total: cartTotal,
        },
        updateCart,
        increment,
        decrement,
    };
};