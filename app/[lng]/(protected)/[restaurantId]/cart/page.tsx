'use client'

import React, {useCallback, useState} from 'react';
import {useCart} from "@/hooks/use-cart";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/stripe/checkout-form";
import {createPaymentIntent} from "@/actions/stripe/payment";
import {useSession} from "next-auth/react";
import {loadStripe} from "@stripe/stripe-js";
import Image from "next/image";
import {FaArrowLeftLong, FaMinus, FaXmark} from "react-icons/fa6";
import {Input} from "@/components/ui/input";
import {MenuItem} from "@prisma/client";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CartPage = () => {
    const session = useSession();

    const {cart, increment, decrement, updateCart} = useCart();

    const [clientSecret, setClientSecret] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paymentProgress, setPaymentProgress] = useState<number>(0);
    const [isReviewCompleted, setIsReviewCompleted] = useState<boolean>(false);

    const tax = 0.23;
    const subtotal = (cart.total - (cart.total * tax)).toFixed(2);


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

    const handleContinueToPayment = () => {
        setIsReviewCompleted(true);
        initiatePayment();
        setTimeout(() => setPaymentProgress(100), 500);
    };
    return (
        <div className="flex items-center justify-center">
            <div className="flex w-screen h-screen">
                <div className="lg:w-1/2 flex flex-col container py-10">
                    <div className="flex flex-1 flex-col space-y-6 2xl:space-y-12">
                        <div className="flex">
                            <Button
                                className="flex items-center justify-center"
                                variant="default"
                                size="sm"
                                onClick={() => {
                                    setIsReviewCompleted(false)
                                    setPaymentProgress(0)
                                }}
                                disabled={!isReviewCompleted}
                            >
                                <FaArrowLeftLong className="w-4 h-4 me-2"/>
                                Go Back
                            </Button>
                        </div>

                        {!isReviewCompleted ? (
                            <div className="flex flex-col space-y-6 2xl:space-y-12">
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
                                                        <div
                                                            className="bg-gray-100 h-full flex items-center justify-center rounded-lg">
                                                            <p>IMAGE</p>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col">
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="font-sm text-gray-500">{item.MenuCategory.name}</p>
                                                        <div>
                                                            <span
                                                                className="text-sm font-medium text-gray-700">{item.price}</span>
                                                            <span
                                                                className="text-sm text-gray-500"> X {item.quantity}</span>
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
                                                        <FaMinus className="w-4 h-4"/>
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
                                        <span className="text-sm font-semibold text-gray-700">${parseFloat(subtotal).toFixed(2)}</span>
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
                                        <span className="text-sm font-semibold text-gray-700">${parseFloat(cart.total.toString()).toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button onClick={handleContinueToPayment}>
                                    Continue to Payment
                                </Button>
                            </div>
                        ) : (
                            clientSecret!! && (
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
                            )
                        )}
                    </div>

                    <div className="flex gap-12 flex-1 items-end">
                        <div className="flex flex-col gap-2 w-full">
                            <p>Review</p>
                            <Progress value={100} className="w-full"/>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <p>Payment</p>
                            <Progress value={paymentProgress} className="w-full transition-transform !duration-1000"/>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex w-1/2 p-2">
                    <Image
                        className="rounded-xl"
                        width={1920}
                        height={300}
                        src={`/assets/cart-bg.jpg`}
                        alt="login-bg"
                    />
                </div>
            </div>
        </div>
    );
};

export default CartPage;