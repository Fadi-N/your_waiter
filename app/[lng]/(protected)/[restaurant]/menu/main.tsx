'use client';

import React, {useState, useCallback} from 'react';
import {CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {IoPizzaOutline, IoSunny} from "react-icons/io5";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import MenuItemCard from "@/components/menu-item-card";
import {ImSpoonKnife} from "react-icons/im";
import {MenuItem} from "@prisma/client";
import {useCartContext} from "@/context/cart-context";
import {Card, CardContent} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

interface SidebarProps {
    menuItems: MenuItem[];
    loading: boolean;
}

const Main: React.FC<SidebarProps> = ({menuItems, loading}) => {
    const {cart, increment, decrement} = useCartContext();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Filtrowanie elementów menu po kategorii
    const filteredMenuItems = selectedCategory
        ? menuItems.filter(item => item.MenuCategory.name === selectedCategory)
        : menuItems;

    // Wyszukiwanie elementów menu
    const searchedMenuItems = filteredMenuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Optymalizacja funkcji
    const handleIncrement = useCallback((item: MenuItem) => increment(item), [increment]);
    const handleDecrement = useCallback((item: MenuItem) => decrement(item), [decrement]);

    return (
        <main className="container">
            {/* Wyszukiwarka */}
            <div className="flex mb-6 md:mt-0">
                <div className="relative flex-1">
                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"/>
                    <Input
                        type="text"
                        placeholder="Search"
                        className="pl-10 w-full rounded-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Kategoria */}
            <div className="mb-6">
                <Carousel>
                    <CarouselContent className="m-0 gap-x-3">
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button
                                className="w-full rounded-full"
                                variant={selectedCategory === null ? "default" : "secondary"}
                                size="sm"
                                onClick={() => setSelectedCategory(null)}
                            >
                                <ImSpoonKnife className="w-4 h-4 me-2"/>
                                All Menu
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button
                                className="w-full rounded-full"
                                variant={selectedCategory === "Pizza" ? "default" : "secondary"}
                                size="sm"
                                onClick={() => setSelectedCategory(selectedCategory === "Pizza" ? null : "Pizza")}
                            >
                                <IoPizzaOutline className="w-4 h-4 me-2"/>
                                Pizza
                            </Button>
                        </CarouselItem>
                        {/* Dodaj inne kategorie analogicznie */}
                    </CarouselContent>
                </Carousel>
            </div>

            {/* Lista elementów menu */}
            <div className="flex flex-col">
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(347.5px,1fr))]">
                    {loading ? (
                        <>
                            <div className="flex flex-col overflow-y-auto pb-3 h-[79vh]">
                                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {[...Array(6)].map((_, index) => (
                                        <Card
                                            key={index}
                                            className="flex flex-col justify-between shadow-md rounded-xl"
                                        >
                                            <CardContent className="flex items-center p-4 space-x-4">
                                                <Skeleton className="h-full w-[125px] rounded-lg"/>
                                                <div className="flex flex-1 flex-col space-y-4">
                                                    <div className="flex flex-col justify-between">
                                                        <div className="flex items-center justify-between">
                                                            <Skeleton className="h-4 w-28 bg-gray-300"/>
                                                            <Skeleton className="h-[24px] w-[24px] rounded-full"/>
                                                        </div>
                                                        <Skeleton className="h-4 w-16 bg-gray-200"/>
                                                    </div>
                                                    <div className="flex flex-col space-y-1">
                                                        <Skeleton className="h-4 w-full"/>
                                                        <Skeleton className="h-4 w-44"/>
                                                    </div>
                                                    <div
                                                        className="flex items-center justify-between space-x-4">
                                                        <Skeleton className="h-4 w-12 bg-gray-300"/>
                                                        <div
                                                            className="counter flex items-center justify-between border rounded-full p-1 h-auto space-x-1">
                                                            <Skeleton className="h-[32px] w-[32px] rounded-full"/>
                                                            <Skeleton className=" h-[32px] w-[32px]"/>
                                                            <Skeleton
                                                                className="h-[32px] w-[32px] bg-gray-300 rounded-full"/>
                                                        </div>
                                                    </div>
                                                </div>

                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {searchedMenuItems.map((item) => (
                                <MenuItemCard
                                    key={item.id}
                                    item={item}
                                    quantity={cart.items.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
                                    onIncrement={() => handleIncrement(item)}
                                    onDecrement={() => handleDecrement(item)}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Main;