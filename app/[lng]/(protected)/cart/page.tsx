'use client'

import React from 'react';
import {Card, CardContent, CardFooter} from "@/components/ui/card";

import {useCart} from "@/hooks/use-cart";
import {Button} from "@/components/ui/button";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const CartPage = () => {
    const {cart, increment, decrement} = useCart();

    return (
        <div className="container">
            <Table>
                <TableCaption>Cart</TableCaption>
                <TableBody>
                    {cart.map((item) => (
                        <TableRow key={item.name}>
                            <TableCell>
                                <div
                                    className="bg-gray-100 h-[200px] flex items-center justify-center rounded-md md:h-auto">
                                    IMAGE
                                </div>
                            </TableCell>
                            <TableCell className="font-medium text-center">
                                <p className="font-bold text-xl">{item.name}</p>
                                <p className="text text-sm">category</p>
                            </TableCell>
                            <TableCell>
                                <div
                                    className="counter flex items-center justify-between border rounded-full p-2 w-full max-w-xs h-auto">
                                    <Button
                                        className="rounded-full border-transparent"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => decrement(item)}
                                    >
                                        <AiOutlineMinus className="w-4 h-4"/>
                                    </Button>
                                    <Input
                                        type="text"
                                        value={cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
                                        className="border-transparent text-center p-0 h-auto w-12"
                                        size="sm"
                                        readOnly
                                    />
                                    <Button
                                        className="rounded-full"
                                        variant="default"
                                        size="icon"
                                        onClick={() => increment(item)}
                                    >
                                        <AiOutlinePlus className="w-4 h-4"/>
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">{item.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default CartPage;