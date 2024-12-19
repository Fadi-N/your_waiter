'use client';

import React, {useState, useCallback} from 'react';
import {CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import MenuItemCard from "@/components/menu-item-card";
import {MenuCategory, MenuItem} from "@prisma/client";
import {useCartContext} from "@/context/cart-context";
import {Card, CardContent} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import SkeletonCard from "@/components/skeleton-card";

interface SidebarProps {
    menuItems: MenuItem[];
    MenuCategories: MenuCategory[];
    loading: boolean;
}

const Main: React.FC<SidebarProps> = ({menuItems, MenuCategories, loading}) => {
    const {cart, increment, decrement} = useCartContext();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Filtrowanie elementów menu
    const filteredMenuItems = menuItems.filter(item => {
        // Jeśli kategoria jest wybrana (nie "all"), filtrujemy po kategorii
        const matchesCategory = selectedCategory === "all" || item.MenuCategory.name === selectedCategory;
        // Wyszukiwanie po nazwie
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Wyszukiwanie elementów menu
    const searchedMenuItems = filteredMenuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Optymalizacja funkcji
    const handleIncrement = useCallback((item: MenuItem) => increment(item), [increment]);
    const handleDecrement = useCallback((item: MenuItem) => decrement(item), [decrement]);

    return (
        <main className="container">

            <div className="flex flex-col space-y-4 my-6">
                {/* Wyszukiwarka */}
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

                {/* Kategoria */}
                <Carousel>
                    <CarouselContent className="m-0 gap-x-3">
                        {loading ? (
                            [...Array(12)].map(_ => (
                                <>
                                    <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                                        <Button
                                            className="w-full rounded-full bg-gray-300"
                                            size="sm"
                                        >
                                        </Button>
                                    </CarouselItem>
                                </>
                            ))
                        ) : (
                            <>
                                <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                                    <Button
                                        className="w-full rounded-full"
                                        variant={selectedCategory === "all" ? "default" : "secondary"}
                                        size="sm"
                                        onClick={() => setSelectedCategory("all")}
                                    >
                                        All
                                    </Button>
                                </CarouselItem>
                                {MenuCategories.map((category, key) => (
                                    <CarouselItem key={key} className="basis-1/3 p-0 md:basis-1/12">
                                        <Button
                                            className="w-full rounded-full"
                                            variant={selectedCategory === category.name ? "default" : "secondary"}
                                            size="sm"
                                            onClick={() => setSelectedCategory(category.name)}
                                        >
                                            {category.name}
                                        </Button>
                                    </CarouselItem>
                                ))}
                            </>
                        )}

                    </CarouselContent>
                </Carousel>

                {/* Lista elementów menu */}
                <div className="flex flex-col">
                    <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(347.5px,1fr))]">
                        {loading ? (
                            <SkeletonCard/>
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
            </div>

        </main>
    );
};

export default Main;