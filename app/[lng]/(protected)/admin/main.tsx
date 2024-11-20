'use client'

import React, {useEffect, useState} from 'react';
import SelectWrapper from "../../../../components/select-wrapper";
import {CiEdit, CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import DialogWrapper from "@/components/dialog-wrapper";
import {IoAddOutline, IoFastFoodOutline, IoRestaurantOutline} from "react-icons/io5";
import RoleGate from "@/components/auth/role-gate";
import {MenuCategory, MenuItem, Restaurant, Table, UserRole} from "@prisma/client";
import NewRestaurantForm from "@/components/admin/new-restaurant-form";
import {Button} from "@/components/ui/button";
import {IoMdDownload} from "react-icons/io";
import Sidebar from "@/app/[lng]/(protected)/Sidebar";
import TableList from "@/components/admin/table-list";
import {getTablesByRestaurant} from "@/actions/admin/restaurant";
import CategoryForm from "@/components/admin/category-form";
import MenuItemForm from "@/components/admin/menu-item-form";
import {useParams} from "next/navigation";
import {useTranslation} from "@/app/i18n/client";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {useMediaQuery} from "@/hooks/use-media-query";
import DrawerWrapper from "@/components/drawer-wrapper";
import {LiaQrcodeSolid} from "react-icons/lia";
import {TbCategoryPlus} from "react-icons/tb";
import {RxCardStackPlus} from "react-icons/rx";
import EditRestaurantForm from "@/components/admin/edit-restaurant-form";
import {GiWoodenChair} from "react-icons/gi";
import {MdAttachMoney} from "react-icons/md";
import PdfDocument from "@/components/pdf-document";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {GrRestaurant} from "react-icons/gr";
import MenuItemCard from "@/components/menu-item-card";
import {getMenuItems, getMenuItemsByRestaurantId} from "@/actions/admin/menu";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Image from "next/image";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

interface MainProps {
    restaurants: Restaurant[]
    menuCategories: MenuCategory[]
    menuItems: { error?: string } | MenuItem[]
}

const Main = ({restaurants, menuCategories}: MainProps) => {
    const {lng} = useParams();
    const {t} = useTranslation(lng)

    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedRestaurant, setSelectedRestaurant] = useState<string>(restaurants[0].id);
    const [tables, setTables] = useState<Table[]>([]);
    const [menuItems, setMenuItems] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        // Fetch tables for the selected restaurant
        const fetchTables = async () => {
            const data = await getTablesByRestaurant(selectedRestaurant);
            setTables(data);
        };

        const fetchMenuItems = async () => {
            const data = await getMenuItemsByRestaurantId(selectedRestaurant);
            setMenuItems(data);
            setLoading(false);
        }

        setLoading(true);
        //fetchTables();
        //fetchMenuItems();

    }, [selectedRestaurant]);

    useEffect(() => {
        const navbarElement = document.querySelector(".navbar-container")?.getBoundingClientRect();
        const restaurantOptionsElement = document.querySelector(".main-restaurant-options-container")?.getBoundingClientRect();
        const tabsElement = document.querySelector(".main-tabs-container");

        if (!navbarElement || !restaurantOptionsElement || !tabsElement) {
            return;
        }

        const navbarElementViewportHeight = navbarElement?.height / 10;
        const restaurantOptionsElementViewportHeight = restaurantOptionsElement?.height / 10;
        const tabsElementViewportHeight = 100 - (navbarElementViewportHeight + restaurantOptionsElementViewportHeight) - 3;

        if (tabsElement) {
            tabsElement.style.height = `${tabsElementViewportHeight}vh`;
        }

    }, []);


    return (
        <main>
            {/*<div
                className="flex flex-wrap justify-between items-center border h-[60px] mb-2 px-2 rounded-xl md:flex-nowrap main-restaurant-options-container">
                <SelectWrapper
                    defaultValue={selectedRestaurant}
                    items={restaurants.map(restaurant => ({
                        id: restaurant.id,
                        label: restaurant.name
                    }))}
                    placeholder={`${t('restaurantSelect')}`}
                    selectLabel="Restaurants"
                    onChange={setSelectedRestaurant}
                />
                <div className="flex-1">
                    <div className="relative float-end me-2">
                        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"/>
                        <Input type="text" placeholder={`${t('search')}`} className="pl-10 rounded-full focus-visible:ring-offset-0 focus-visible:ring-0"/>
                    </div>
                </div>

                <div className="flex w-full justify-between gap-x-2 mt-2 md:justify-end md:mt-0 md:w-auto">
                    {isDesktop ? (
                        <>
                            <DialogWrapper
                                triggerLabel={`${t('newRestaurant')}`}
                                triggerIcon={<IoAddOutline className="w-4 h-4"/>}
                                headerLabel="Create Restaurant"
                                description="Set up your restaurant profile and generate QR codes for table orders. Click 'Create' when you're done."
                            >
                                <RoleGate allowedRole={UserRole.ADMIN}>
                                    <NewRestaurantForm/>
                                </RoleGate>
                            </DialogWrapper>
                        </>
                    ) : (
                        <DrawerWrapper
                            triggerLabel={`${t('newRestaurant')}`}
                            triggerIcon={<IoAddOutline className="w-4 h-4"/>}
                            headerLabel="Create Restaurant"
                            description="Set up your restaurant profile and generate QR codes for table orders. Click 'Create' when you're done."
                        >
                            <RoleGate allowedRole={UserRole.ADMIN}>
                                <NewRestaurantForm/>
                            </RoleGate>
                        </DrawerWrapper>
                    )}

                    {isDesktop ? (
                        <>
                            <DialogWrapper
                                triggerLabel={`${t('editRestaurant')}`}
                                triggerIcon={<CiEdit className="w-4 h-4"/>}
                                headerLabel="Edit Restaurant"
                                description="Manage your restaurant profile. You can add or remove tables, generate new QR codes for new tables, or delete the restaurant. Click 'Save' when you're done."
                            >
                                <RoleGate allowedRole={UserRole.ADMIN}>
                                    <EditRestaurantForm selectedRestaurant={selectedRestaurant} tables={tables}/>
                                </RoleGate>
                            </DialogWrapper>
                        </>
                    ) : (
                        <DrawerWrapper
                            triggerLabel={`${t('editRestaurant')}`}
                            triggerIcon={<CiEdit className="w-4 h-4"/>}
                            headerLabel="Edit Restaurant"
                            description="Manage your restaurant profile. You can add or remove tables, generate new QR codes for new tables, or delete the restaurant. Click 'Save' when you're done."
                        >
                            <RoleGate allowedRole={UserRole.ADMIN}>
                                <EditRestaurantForm selectedRestaurant={selectedRestaurant} tables={tables}/>
                            </RoleGate>
                        </DrawerWrapper>
                    )}
                </div>
            </div>*/}

            <Tabs defaultValue="category"
                  className="flex flex-col gap-x-6 overflow-hidden md:flex-row main-tabs-container">
                {/*<TabsList
                    className="flex-col h-auto gap-2 p-4 border bg-white rounded-xl overflow-y-auto md:w-2/12 md:flex-col md:justify-start md:h-full"
                >
                    <TabsTrigger
                        className="rounded-xl w-full flex items-center justify-start"
                        value="restaurant"
                    >
                        <div className="p-3 bg-pink-500 text-white rounded-full">
                            <GrRestaurant width={20} height={20}/>
                        </div>
                        <span className="ms-2">
                        Restaruant
                        </span>
                    </TabsTrigger>
                    <TabsTrigger
                        className="rounded-xl w-full flex items-center justify-start"
                        value="category"
                    >
                        <div className="p-3 bg-red-500 text-white rounded-full">
                            <IoFastFoodOutline width={20} height={20}/>
                        </div>
                        <span className="ms-2">
                        Food Categories
                        </span>
                    </TabsTrigger>
                    <TabsTrigger
                        className="rounded-xl w-full flex items-center justify-start"
                        value="menu-item"
                    >
                        <div className="p-3 bg-orange-400 text-white rounded-full">
                            <IoRestaurantOutline width={20} height={20}/>
                        </div>
                        <span className="ms-2">
                        Menu Management
                        </span>
                    </TabsTrigger>
                    <TabsTrigger
                        className="rounded-xl w-full flex items-center justify-start"
                        value="reservation-system"
                    >
                        <div className="p-3 bg-green-500 text-white rounded-full">
                            <GiWoodenChair width={20} height={20}/>
                        </div>
                        <span className="ms-2">
                        Reservation System
                        </span>
                    </TabsTrigger>
                    <TabsTrigger
                        className="rounded-xl w-full flex items-center justify-start"
                        value="book-a-table"
                    >
                        <div className="p-3 bg-yellow-500 text-white rounded-full">
                            <MdAttachMoney width={20} height={20}/>
                        </div>
                        <span className="ms-2">
                        Transaction History
                        </span>
                    </TabsTrigger>
                </TabsList>*/}

                <TabsContent
                    value="restaurant"
                    className="bg-gray-100 p-4 rounded-xl overflow-y-auto md:w-10/12 md:mt-0"
                >
                    <div className="float-end">
                        <PDFDownloadLink
                            document={<PdfDocument tables={tables}/>}
                            fileName="QRCodes.pdf"
                        >
                            <Button
                                className="rounded-full"
                                variant="ghost"
                            >
                                <span className="me-2"><IoMdDownload/></span>
                                QR codes
                            </Button>
                        </PDFDownloadLink>
                    </div>
                </TabsContent>

                <TabsContent
                    value="category"
                    className="p-4 border rounded-xl md:w-10/12 md:mt-0"
                >
                    {isDesktop ? (
                        <>
                            <div className="flex justify-end">
                                <DialogWrapper
                                    triggerLabel={`${t('addCategory')}`}
                                    triggerIcon={<IoAddOutline className="w-4 h-4"/>}
                                    headerLabel="Add a New Menu Category"
                                    description="Provide the necessary details"
                                >
                                    <RoleGate allowedRole={UserRole.ADMIN}>
                                        <CategoryForm selectedRestaurant={selectedRestaurant}/>
                                    </RoleGate>
                                </DialogWrapper>
                            </div>
                            <hr className="mb-4"/>
                            {loading ? (
                                <>
                                    <div className="flex flex-col overflow-y-auto pb-3 h-[79vh]">
                                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                            {[...Array(6)].map((_, index) => (
                                                <Card key={index}
                                                      className="flex flex-col justify-between w-full shadow-md rounded-xl">
                                                    <CardContent
                                                        className="h-full md:grid md:grid-cols-2 md:gap-6 md:p-6">
                                                        <Skeleton className="h-[178px] w-full rounded-lg"/>
                                                        <div className="mx-6 mt-6 md:mx-0 md:mt-0">
                                                            <div className="space-y-2">
                                                                <Skeleton
                                                                    className="h-4 w-[80px] md:w-[100px] lg:max-w-[120px]"/>
                                                                <Skeleton
                                                                    className="h-4 w-[40px] md:w-[50px] lg:max-w-[60px]"/>
                                                            </div>
                                                            <div className="mt-6">
                                                                <div className="space-y-2">
                                                                    <Skeleton
                                                                        className="h-4 w-[125px] md:w-[150px] lg:max-w-[175px]"/>
                                                                    <Skeleton
                                                                        className="h-4 w-[100px] md:w-[125px] lg:max-w-[150px]"/>
                                                                    <Skeleton
                                                                        className="h-4 w-[75px] md:w-[100px] lg:max-w-[125px]"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className="grid grid-cols-2 gap-6">
                                                        <Skeleton className="h-4 w-full"/>
                                                        <div
                                                            className="counter flex items-center justify-between border rounded-full p-2 w-full max-w-xs h-auto">
                                                            <Skeleton className="h-[40px] w-[40px] rounded-full"/>
                                                            <Skeleton
                                                                className=" h-[40px] w-[30px] md:w-[40px] lg:w-[50px]"/>
                                                            <Skeleton
                                                                className="h-[40px] w-[40px] bg-gray-300 rounded-full"/>
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(347.5px,1fr))]">
                                    {menuItems?.map((item: MenuItem) => (
                                        <MenuItemCard key={item.id} item={item}/>
                                    ))}
                                </div>
                            )}
                        </>

                    ) : (
                        <DrawerWrapper
                            triggerLabel={`${t('addCategory')}`}
                            triggerIcon={<IoAddOutline className="w-4 h-4 me-2"/>}
                            headerLabel="Add a New Menu Category"
                            description="Provide the necessary details"
                        >
                            <RoleGate allowedRole={UserRole.ADMIN}>
                                <CategoryForm selectedRestaurant={selectedRestaurant}/>
                            </RoleGate>
                        </DrawerWrapper>
                    )}
                </TabsContent>
                <TabsContent value="menu-item"
                             className="bg-gray-100 p-4 rounded-xl overflow-y-auto md:w-10/12 md:mt-0">
                    {isDesktop ? (
                        <>
                            <div className="flex justify-end">
                                <DialogWrapper
                                    triggerLabel={`${t('addMenuItem')}`}
                                    triggerIcon={<IoAddOutline className="w-4 h-4"/>}
                                    headerLabel="Add a New Menu Item"
                                    description="Enter the details of the new menu item, including name, description, and price."
                                >
                                    <RoleGate allowedRole={UserRole.ADMIN}>
                                        <MenuItemForm
                                            selectedRestaurant={selectedRestaurant}
                                            menuCategories={menuCategories}
                                        />
                                    </RoleGate>
                                </DialogWrapper>
                            </div>
                            <hr/>
                            {loading ? (
                                <div className="flex flex-col space-y-3">
                                    <Skeleton className="h-[125px] w-[250px] rounded-xl"/>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[250px]"/>
                                        <Skeleton className="h-4 w-[200px]"/>
                                    </div>
                                </div>
                            ) : (
                                menuItems?.map((item: MenuItem) => (
                                    <MenuItemCard key={item.id} item={item}/>
                                ))
                            )}
                        </>
                    ) : (
                        <DrawerWrapper
                            triggerLabel={`${t('addMenuItem')}`}
                            triggerIcon={<IoAddOutline className="w-4 h-4 me-2"/>}
                            headerLabel="Add a New Menu Item"
                            description="Enter the details of the new menu item, including name, description, and price."
                        >
                            <RoleGate allowedRole={UserRole.ADMIN}>
                                <MenuItemForm
                                    selectedRestaurant={selectedRestaurant}
                                    menuCategories={menuCategories}
                                />
                            </RoleGate>
                        </DrawerWrapper>
                    )}
                </TabsContent>
            </Tabs>
        </main>
    );
};


export default Main;