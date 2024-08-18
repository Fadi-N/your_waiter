import React from 'react';
import {CiEdit, CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {IoPizzaOutline} from "react-icons/io5";
import {GiCupcake, GiHamburger} from "react-icons/gi";
import {RiBowlLine, RiDrinksLine} from "react-icons/ri";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import CardWrapper from "@/components/auth/card-wrapper";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";
import BackButton from "@/components/auth/back-button";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {IoMdAdd} from "react-icons/io";

const Main = () => {
    return (
        <main>
            <div className="flex mb-6">
                <div className="relative">
                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"/>
                    <Input type="text" placeholder="Search" className="pl-10 rounded-full"/>
                </div>
            </div>
            <div className="flex mb-6">
                <Carousel>
                    <CarouselContent className="-ml-2 md:-ml-4 w-[480px]">
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
                <div className="flex items-center justify-between">
                    <Card className="w-[400px] shadow-md">
                        <CardContent className="grid grid-cols-2 p-6 gap-x-6">
                            <div className="bg-gray-100 flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div>
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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
                    <Card className="w-[400px] shadow-md">
                        <CardContent className="grid grid-cols-2 pt-6 gap-x-6">
                            <div className="bg-gray-100 flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div>
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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

                    <Card className="w-[400px] shadow-md">
                        <CardContent className="grid grid-cols-2 pt-6 gap-x-6">
                            <div className="bg-gray-100 flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div>
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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

                    <Card className="w-[400px] shadow-md">
                        <CardContent className="grid grid-cols-2 pt-6 gap-x-6">
                            <div className="bg-gray-100 flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div>
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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
                    <Card className="w-[400px] shadow-md">
                        <CardContent className="grid grid-cols-2 pt-6 gap-x-6">
                            <div className="bg-gray-100 flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div>
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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

                    <Card className="w-[400px] shadow-md">
                        <CardContent className="grid grid-cols-2 pt-6 gap-x-6">
                            <div className="bg-gray-100 flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div>
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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

                </div>
                <div className="flex items-center justify-between mt-6">
                    <Card className="w-[400px] shadow-md">
                        <CardContent className="px-0">
                            <div className="bg-gray-100 h-[200px] flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div className="mx-6 mt-6">
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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
                    <Card className="w-[400px] shadow-md">
                        <CardContent className="px-0">
                            <div className="bg-gray-100 h-[200px] flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div className="mx-6 mt-6">
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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
                    <Card className="w-[400px] shadow-md">
                        <CardContent className="px-0">
                            <div className="bg-gray-100 h-[200px] flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div className="mx-6 mt-6">
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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
                    <Card className="w-[400px] shadow-md">
                        <CardContent className="px-0">
                            <div className="bg-gray-100 h-[200px] flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div className="mx-6 mt-6">
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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
                    <Card className="w-[400px] shadow-md">
                        <CardContent className="px-0">
                            <div className="bg-gray-100 h-[200px] flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div className="mx-6 mt-6">
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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
                    <Card className="w-[400px] shadow-md">
                        <CardContent className="px-0">
                            <div className="bg-gray-100 h-[200px] flex items-center justify-center rounded-md">
                                IMAGE
                            </div>
                            <div className="mx-6 mt-6">
                                <p className="font-bold text-xl">Title</p>
                                <p className="text text-sm">Subtitle</p>
                                <p>Description</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-x-6">
                            <p className="text-xl font-bold">19.99 $</p>
                            <div className="counter flex border rounded-full p-2">
                                <Button
                                    className="rounded-full border-transparent"
                                    variant="outline"
                                    size="sm"
                                >
                                    <AiOutlineMinus className="w-4 h-4"/>
                                </Button>
                                <Input type="text" placeholder="0" className="border-transparent text-center p-0 h-auto" size="sm"/>
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
                </div>
            </div>
        </main>
    );
};

export default Main;