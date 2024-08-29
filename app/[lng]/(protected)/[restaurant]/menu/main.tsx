'use client'

import React from 'react';
import {CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {IoPizzaOutline} from "react-icons/io5";
import {GiCupcake, GiHamburger} from "react-icons/gi";
import {RiBowlLine, RiDrinksLine} from "react-icons/ri";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {useParams, useSearchParams} from "next/navigation";

const Main = ({menuItems}) => {
    const {lng, restaurant} = useParams();
    const searchParams = useSearchParams();
    const  table = searchParams.get("table");
    console.log(lng, restaurant, table)

    return (
        <main>
            <div className="flex my-6 md:mt-0">
                <div className="relative flex-1">
                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"/>
                    <Input type="text" placeholder="Search" className="pl-10 rounded-full"/>
                </div>
            </div>
            <div className="flex mb-6">
                <Carousel className="flex-1">
                    <CarouselContent className="-ml-2 md:-ml-4 w-[347.5px] md:w-[500px]">
                        <CarouselItem className="basis-1/3 pl-2 md:basis-1/4 md:pl-4">
                            <Button
                                className="rounded-full"
                            >
                                <IoPizzaOutline className="w-4 h-4 me-2"/>
                                Pizza
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 pl-2 md:basis-1/4 md:pl-4">
                            <Button
                                className="rounded-full"
                                variant="secondary"
                            >
                                <GiHamburger className="w-4 h-4 me-2"/>
                                Burger
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 pl-2 md:basis-1/4 md:pl-4">
                            <Button
                                className="rounded-full"
                                variant="secondary"
                            >
                                <RiBowlLine className="w-4 h-4 me-2"/>
                                Pasta
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 pl-2 md:basis-1/4 md:pl-4">
                            <Button
                                className="rounded-full"
                                variant="secondary"
                            >
                                <GiCupcake className="w-4 h-4 me-2"/>
                                Snacks
                            </Button>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 pl-2 md:basis-1/4 md:pl-4">
                            <Button
                                className="rounded-full"
                                variant="secondary"
                            >
                                <RiDrinksLine className="w-4 h-4 me-2"/>
                                Drinks
                            </Button>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="flex flex-col">
                <p className="text-2xl pb-4">Choose Pizza</p>
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(347.5px,1fr))]">
                    {menuItems.map((item) => (
                        <Card className="w-full shadow-md">
                            <CardContent className="px-0 md:grid md:grid-cols-2 md:p-6 md:gap-x-6 md:px-6">
                                <div
                                    className="bg-gray-100 h-[200px] flex items-center justify-center rounded-md md:h-auto">
                                    IMAGE
                                </div>
                                <div className="mx-6 mt-6 md:mx-0 md:mt-0">
                                    <p className="font-bold text-xl">{item.name}</p>
                                    <p className="text text-sm">{item.MenuCategory.name}</p>
                                    <p>{item.description}</p>
                                </div>
                            </CardContent>
                            <CardFooter className="grid grid-cols-2 gap-x-6">
                                <p className="text-xl font-bold">{item.price} $</p>
                                <div className="counter flex border rounded-full p-2">
                                    <Button
                                        className="rounded-full border-transparent"
                                        variant="outline"
                                        size="sm"
                                    >
                                        <AiOutlineMinus className="w-4 h-4"/>
                                    </Button>
                                    <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto"
                                           size="sm"/>
                                    <Button
                                        className="rounded-full"
                                        variant="default"
                                        size="sm"
                                    >
                                        <AiOutlinePlus className="w-4 h-4"/>
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Main;