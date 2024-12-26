'use client'

import {getMenuItems} from "@/actions/admin/menu";
import {getMenuCategory} from "@/actions/admin/menu-category";
import React, {useState, useEffect, useCallback} from "react";
import {CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import MenuItemCard from "@/components/menu-item-card";
import {MenuCategory, MenuItem} from "@prisma/client";
import {useCartContext} from "@/context/cart-context";
import SkeletonCard from "@/components/skeleton-card";
import {isEmptyArray} from "@nextui-org/shared-utils";
import Image from "next/image";
import {useParams} from "next/navigation";

export default function MenuPage() {
    const {restaurantId} = useParams();

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [MenuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const {cart, increment, decrement} = useCartContext();

    // Pobranie danych o menu i kategoriach
    useEffect(() => {
        const fetchMenuItems = async () => {
            setLoading(true);
            try {
                const items = await getMenuItems(restaurantId);
                setMenuItems(items);

                const categories = await getMenuCategory(restaurantId);
                setMenuCategories(categories);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [restaurantId]);

    // Filtrowanie elementów menu
    const filteredMenuItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory === "all" || item.MenuCategory.name === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Funkcje do zwiększania i zmniejszania ilości w koszyku
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
                            [...Array(12)].map((_, index) => (
                                <CarouselItem key={`placeholder-${index}`} className="basis-1/3 p-0 md:basis-1/12">
                                    <Button
                                        className="w-full rounded-full bg-gray-300"
                                        size="sm"
                                    >
                                    </Button>
                                </CarouselItem>
                            ))
                        ) : (
                            <>
                                <CarouselItem key="all-category" className="basis-1/3 p-0 md:basis-1/12">
                                    <Button
                                        className="w-full rounded-full"
                                        variant={selectedCategory === "all" ? "default" : "secondary"}
                                        size="sm"
                                        onClick={() => setSelectedCategory("all")}
                                    >
                                        All
                                    </Button>
                                </CarouselItem>
                                {MenuCategories.map((category) => (
                                    <CarouselItem key={`menu-category-${category.name}`}
                                                  className="basis-1/3 p-0 md:basis-1/12">
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
                    {filteredMenuItems.length > 0 || loading ? (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {loading ? (
                                <SkeletonCard/>
                            ) : (
                                <>
                                    {filteredMenuItems.map((item: MenuItem) => (
                                        <MenuItemCard
                                            key={item.id}
                                            item={item}
                                            onIncrement={() => handleIncrement(item)}
                                            onDecrement={() => handleDecrement(item)}
                                        />
                                    ))}

                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <Image
                                className="rounded-xl"
                                width={500}
                                height={500}
                                src={`/assets/no-item-found.jpg`}
                                alt="no-item-found"
                            />
                            <p className="text-lg lg:text-xl">Our chefs are still looking for that one!</p>
                            <p className="lg:text-lg">How about something else?</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}