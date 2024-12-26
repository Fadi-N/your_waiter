import React, {useState} from 'react';
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {AiOutlineInfo, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Image from "next/image";

const MenuItemCard = (
    {item, onIncrement = () => {}, onDecrement = () => {}, quantity = 0}) => {
    const [whole, decimal] = item.price.toFixed(2).split(".");
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 40;

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const trimmedDescription = item.description.length > maxLength
        ? item.description.slice(0, maxLength) + "..."
        : item.description;

    const displayedDescription = isExpanded ? item.description : trimmedDescription;

    return (
        <Card className="flex flex-col justify-between shadow-md rounded-xl">
            <CardContent className="flex items-center p-4 space-x-4">
                {item.imageUrl ? (
                    <Image
                        className="object-cover rounded-lg"
                        src={item?.imageUrl || "/default-placeholder.png"}
                        width={125}
                        height={125}
                        alt="menu-item-img"
                    />
                ) : (
                    <div className="bg-gray-100 h-full flex items-center justify-center rounded-lg">
                        <p>IMAGE</p>
                    </div>
                )}
                <div className="flex flex-1 flex-col space-y-2">
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-xl">{item.name}</p>
                            <Button
                                className="rounded-full w-6 h-6"
                                variant="outline"
                                size="icon"
                            >
                                <AiOutlineInfo className="w-4 h-4"/>
                            </Button>
                        </div>
                        <p className="font-medium">{item.MenuCategory.name}</p>
                    </div>
                    {/*  <p className="text-gray-500 text-sm">
                        <span className="me-2">{displayedDescription}</span>
                        {item.description.length > maxLength && (
                            <button
                                className="text-black hover:underline"
                                onClick={handleToggleDescription}
                            >
                                {isExpanded ? "read less" : "read more"}
                            </button>
                        )}
                    </p>*/}
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-start space-x-1 text-2xl font-bold">
                            <span className="text-xl font-semibold">$</span>
                            <span className="text-xl font-semibold">{whole}</span>
                            <span className="text-sm align-top">{decimal}</span>
                        </div>
                        <div className="counter flex items-center justify-between border rounded-full p-1 h-auto">
                            <Button
                                className="rounded-full border-transparent w-8 h-8"
                                variant="outline"
                                size="icon"
                                onClick={onDecrement}
                                disabled={quantity === 0}
                            >
                                <AiOutlineMinus className="w-4 h-4"/>
                            </Button>
                            <Input
                                type="text"
                                value={quantity}
                                className="border-transparent text-center p-0 h-auto w-12"
                                readOnly
                            />
                            <Button
                                className="rounded-full w-8 h-8"
                                variant="default"
                                size="icon"
                                onClick={onIncrement}
                            >
                                <AiOutlinePlus className="w-4 h-4"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MenuItemCard;