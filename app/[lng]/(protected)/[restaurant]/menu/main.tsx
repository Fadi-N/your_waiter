'use client'

import React from 'react';
import {CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {IoPizzaOutline, IoSunny} from "react-icons/io5";
import {GiCupcake, GiHamburger, GiSteak, GiSushis, GiNoodles, GiChickenOven, GiFlatfish} from "react-icons/gi";
import {RiBowlLine, RiDrinksLine} from "react-icons/ri";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {useCart} from "@/hooks/use-cart";
import MenuItemCard from "@/components/menu-item-card";
import {ImSpoonKnife} from "react-icons/im";
import { IoIceCreamOutline } from "react-icons/io5";
import { RiLeafLine } from "react-icons/ri";
import {TbSalad} from "react-icons/tb";


const Main = ({menuItems}) => {
    const {cart, increment, decrement} = useCart();

    return (
        <main className="container">
            <div className="flex my-6 md:mt-0">
                <div className="relative flex-1">
                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"/>
                    <Input type="text" placeholder="Search" className="pl-10 w-full rounded-full"/>
                </div>
            </div>
            <div className="mb-6">
                <Carousel>
                    <CarouselContent className="m-0 gap-x-3">
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full">
                                <ImSpoonKnife className="w-4 h-4 me-2"/>
                                All Menu
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <IoPizzaOutline className="w-4 h-4 me-2"/>
                                Pizza
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <GiHamburger className="w-4 h-4 me-2"/>
                                Burger
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <RiBowlLine className="w-4 h-4 me-2"/>
                                Pasta
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <GiCupcake className="w-4 h-4 me-2"/>
                                Snacks
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <RiDrinksLine className="w-4 h-4 me-2"/>
                                Drinks
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <GiSteak className="w-4 h-4 me-2"/>
                                Grill
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <GiSushis className="w-4 h-4 me-2"/>
                                Sushi
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <GiNoodles className="w-4 h-4 me-2"/>
                                Noodles
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <GiChickenOven className="w-4 h-4 me-2"/>
                                Chicken
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <IoIceCreamOutline className="w-4 h-4 me-2"/>
                                Desserts
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-0 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <RiLeafLine className="w-4 h-4 me-2"/>
                                Vegan
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <TbSalad className="w-4 h-4 me-2"/>
                                Salads
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <GiFlatfish className="w-4 h-4 me-2"/>
                                Seafood
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 md:basis-1/12">
                            <Button className="w-full rounded-full" variant="secondary">
                                <IoSunny className="w-4 h-4 me-2"/>
                                Breakfast
                            </Button>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="flex flex-col">
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(347.5px,1fr))]">
                    {menuItems.map((item) => (
                        <MenuItemCard
                            key={item.id}
                            item={item}
                            quantity={cart.items.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
                            onIncrement={() => increment(item)}
                            onDecrement={() => decrement(item)}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Main;
