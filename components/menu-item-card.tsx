import React from 'react';
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Image from "next/image";

// Reusable Card component for menu items
const MenuItemCard = ({
                          item, onIncrement = () => {
    }, onDecrement = () => {
    }, quantity = 0
                      }) => {
    return (
        <Card className="flex flex-col justify-between w-full shadow-md rounded-xl">
            <CardContent className="px-0 h-full md:grid md:grid-cols-2 md:p-6 md:gap-x-6 md:px-6">
                {item.imageUrl ? (
                    <Image
                        className="object-cover rounded-lg"
                        src={item?.imageUrl}
                        width={500}
                        height={500}
                        alt="menu-item-img"
                    />
                ) : (
                    <div className="bg-gray-100 h-full flex items-center justify-center rounded-lg">
                        <p>IMAGE</p>
                    </div>
                )}
                <div className="mx-6 mt-6 md:mx-0 md:mt-0">
                    <p className="font-bold text-xl">{item.name}</p>
                    <p className="text text-sm">{item.MenuCategory.name}</p>
                    <p>{item.description}</p>
                </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-x-6">
                <p className="text-xl font-bold">{item.price} $</p>
                <div
                    className="counter flex items-center justify-between border rounded-full p-2 w-full max-w-xs h-auto">
                    <Button
                        className="rounded-full border-transparent"
                        variant="outline"
                        size="icon"
                        onClick={onDecrement}
                    >
                        <AiOutlineMinus className="w-4 h-4"/>
                    </Button>
                    <Input
                        type="text"
                        value={quantity}
                        className="border-transparent text-center p-0 h-auto w-12"
                        size="sm"
                        readOnly
                    />
                    <Button
                        className="rounded-full"
                        variant="default"
                        size="icon"
                        onClick={onIncrement}
                    >
                        <AiOutlinePlus className="w-4 h-4"/>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default MenuItemCard;
