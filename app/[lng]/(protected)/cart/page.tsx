'use client'

import React, {useCallback, useState} from 'react';
import {useCart} from "@/hooks/use-cart";
import {Button} from "@/components/ui/button";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/stripe/checkout-form";
import {createPaymentIntent} from "@/actions/stripe/payment";
import {useSession} from "next-auth/react";
import {loadStripe} from "@stripe/stripe-js";
import Image from "next/image";
import {FaArrowLeftLong, FaXmark} from "react-icons/fa6";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {MdOutlineCategory} from "react-icons/md";
import {MenuItem} from "@prisma/client";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CartPage = () => {
    const session = useSession();

    const {cart, increment, decrement, updateCart} = useCart();

    const [clientSecret, setClientSecret] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState(false);

    const tax = 0.23;
    const subtotal = cart.total - (cart.total * tax).toFixed(2);


    const amount = 49;
    const initiatePayment = async () => {
        setIsLoading(true);

        const paymentIntent = await createPaymentIntent(amount * 100, `Payment of the user ${session.data?.user?.name}`)

        setClientSecret(paymentIntent.client_secret);

        setIsLoading(false);
    };

    const handleDecrement = useCallback(
        (item: MenuItem) => {
            const existingItem = cart.items.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                const newQuantity = Math.max(existingItem.quantity - 1, 0);
                updateCart(item, newQuantity);
            }
        }, [cart.items]
    );

    return (
        <div className="container flex flex-col space-y-6">
            <div className="flex">
                <Button
                    className="flex items-center justify-center"
                    variant="default"
                    size="sm"
                >
                    <FaArrowLeftLong className="w-4 h-4 me-2"/>
                    Go Back
                </Button>
            </div>

            <div>
                <div className="font-medium text-2xl">Review your order</div>
                {cart.items.map((item) => (
                    <div key={item.name} className="border-b">
                        <div className="flex items-center justify-between my-4">
                            <div className="flex flex-row items-center gap-4">
                                {item.imageUrl ? (
                                    <Image
                                        className="object-cover rounded-lg"
                                        src={item?.imageUrl || "/default-placeholder.png"}
                                        width={100}
                                        height={100}
                                        alt="menu-item-img"
                                    />
                                ) : (
                                    <div className="bg-gray-100 h-full flex items-center justify-center rounded-lg">
                                        <p>IMAGE</p>
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="font-sm text-gray-500">{item.MenuCategory.name}</p>
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">{item.price}</span>
                                        <span className="text-sm text-gray-500"> X {item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button
                                    className="rounded-full border-transparent w-8 h-8"
                                    variant="default"
                                    size="icon"
                                    onClick={() => handleDecrement(item)}
                                >
                                    <FaXmark className="w-4 h-4"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        className="pl-4 rounded-2xl focus-visible:ring-offset-0 focus-visible:ring-0"
                        placeholder="Enter coupon code"
                    />
                    <Button
                        variant="default"
                        size="sm"
                    >
                        Apply
                    </Button>
                </div>
            </div>

            <div className="flex flex-col space-y-4">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <span className="text-sm font-semibold text-gray-700">${subtotal}</span>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-sm text-gray-500">Tax</p>
                    <span className="text-sm font-semibold text-gray-700">{tax}</span>
                </div>
                <div className="border-b">
                    <div className="flex flex-row items-center justify-between  mb-4">
                        <p className="text-sm text-gray-500">Discount</p>
                        <span
                            className="text-sm font-semibold text-gray-700">${cart?.discount ? cart.discount : "0.00"}</span>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-sm text-gray-500">Total</p>
                    <span className="text-sm font-semibold text-gray-700">{cart.total}</span>
                </div>
            </div>


            <Button onClick={initiatePayment}>
                Continue to Payment
            </Button>

            {clientSecret!! && (
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: clientSecret,
                    }}
                >
                    <CheckoutForm
                        isLoading={isLoading}
                    />
                </Elements>
            )}
        </div>
    );
};

export default CartPage;