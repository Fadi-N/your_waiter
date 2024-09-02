import {useEffect, useState} from "react";

interface MenuItem {
    id: string;
    name: string;
    price: number;
}

interface CartItem extends MenuItem {
    quantity: number;
    total: number;
}

export const useCart = () => {
    // Initialize cart state from localStorage if available
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Update localStorage whenever cart state changes
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart updated:', cart);
    }, [cart]);

    const updateCart = (item: MenuItem, newQuantity: number) => {
        setCart((prevCart) => {
            // Find the index of the item in the current cart
            const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);

            if (itemIndex === -1 && newQuantity > 0) {
                // Add new item if not already in cart and quantity > 0
                return [...prevCart, {
                    ...item,
                    quantity: newQuantity,
                    total: item.price * newQuantity
                }]
            } else if (itemIndex !== -1) {
                // If the item is already in the cart
                const updatedCart = [...prevCart];

                if (newQuantity === 0) {
                    // If the new quantity is 0, remove the item from the cart
                    updatedCart.splice(itemIndex, 1);
                } else {
                    // Update the existing item's quantity and total price
                    updatedCart[itemIndex] = {
                        ...updatedCart[itemIndex],
                        quantity: newQuantity,
                        total: updatedCart[itemIndex].price * newQuantity,
                    };
                }

                return updatedCart;
            }

            // Return the previous cart if no changes are made
            return prevCart;
        })
    }

    const increment = (item: MenuItem) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        updateCart(item, (existingItem?.quantity || 0) + 1);
    }
    const decrement = (item: MenuItem) => {
        // Find the item in the cart by its id
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        // Subtract 1 from the quantity or start at 0 if the item doesn't exist
        updateCart(item, Math.max((existingItem?.quantity || 0) - 1, 0));
    };

    return {
        cart,
        updateCart,
        increment,
        decrement
    }

}