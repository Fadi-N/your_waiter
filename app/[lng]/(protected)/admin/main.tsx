'use client'

import React, {useEffect, useState} from 'react';
import SelectWrapper from "../../../../components/select-wrapper";
import {CiEdit, CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import DialogWrapper from "@/components/dialog-wrapper";
import {IoAddOutline, IoFastFoodOutline, IoRestaurantOutline} from "react-icons/io5";
import RoleGate from "@/components/auth/role-gate";
import {MenuCategory, Restaurant, Table, UserRole} from "@prisma/client";
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

interface MainProps {
    restaurants: Restaurant[]
    menuCategories: MenuCategory[]
}

const Main = ({restaurants, menuCategories}: MainProps) => {
    const {lng} = useParams();
    const {t} = useTranslation(lng)

    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedRestaurant, setSelectedRestaurant] = useState<string>(restaurants[0].id);
    const [tables, setTables] = useState<Table[]>([]);

    useEffect(() => {
        // Fetch tables for the selected restaurant
        const fetchTables = async () => {
            const data = await getTablesByRestaurant(selectedRestaurant);
            setTables(data);
        };

        fetchTables();

    }, [selectedRestaurant]);

    useEffect(() => {
        const navbarElement = document.querySelector(".navbar-container")?.getBoundingClientRect();
        const restaurantOptionsElement = document.querySelector(".main-restaurant-options-container")?.getBoundingClientRect();
        const tabsElement = document.querySelector(".main-tabs-container");

        const navbarElementViewportHeight = navbarElement?.height / 10;
        const restaurantOptionsElementViewportHeight = restaurantOptionsElement?.height / 10;
        const tabsElementViewportHeight = 100 - (navbarElementViewportHeight + restaurantOptionsElementViewportHeight);

        if (tabsElement) {
            tabsElement["style"].height = `${tabsElementViewportHeight}vh`;
        }

    }, []);


    return (
        <main>
            <div
                className="flex flex-wrap justify-between items-center bg-gray-100 p-2 rounded-2xl my-6 md:mt-0 md:flex-nowrap main-restaurant-options-container">
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
                        <Input type="text" placeholder={`${t('search')}`} className="pl-10 rounded-full"/>
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
                                    <EditRestaurantForm/>
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
                                <EditRestaurantForm/>
                            </RoleGate>
                        </DrawerWrapper>
                    )}

                    {isDesktop ? (
                        <>
                            <DialogWrapper
                                triggerLabel={`${t('QRCodes')}`}
                                triggerIcon={<LiaQrcodeSolid className="w-4 h-4"/>}
                                headerLabel="Download QR codes"
                                description="Click to download the QR codes generated for your restaurant"
                            >
                                <RoleGate allowedRole={UserRole.ADMIN}>
                                    <TableList selectedRestaurant={selectedRestaurant} tables={tables}/>
                                </RoleGate>
                            </DialogWrapper>
                        </>
                    ) : (
                        <DrawerWrapper
                            triggerLabel={`${t('QRCodes')}`}
                            triggerIcon={<LiaQrcodeSolid className="w-4 h-4 me-2"/>}
                            headerLabel="Download QR codes"
                            description="Click to download the QR codes generated for your restaurant"
                        >

                            <TableList selectedRestaurant={selectedRestaurant} tables={tables}/>

                        </DrawerWrapper>
                    )}
                </div>
            </div>

            <Tabs defaultValue="category"
                  className="flex flex-col gap-x-6 overflow-hidden md:flex-row main-tabs-container">
                <TabsList
                    className="flex gap-2 p-4 h-full bg-neutral-800 text-white rounded-2xl overflow-y-auto md:w-2/12 md:flex-col md:justify-start"
                >
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
                </TabsList>
                <TabsContent
                    value="category"
                    className="bg-gray-100 p-4 rounded-2xl overflow-y-auto md:w-10/12 md:mt-0"
                >
                    {isDesktop ? (
                        <div className="float-end">
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
                <TabsContent value="menu-item" className="bg-gray-100 p-4 rounded-2xl overflow-y-auto md:w-10/12 md:mt-0">
                    {isDesktop ? (
                        <div className="float-end">
                            <DialogWrapper
                                triggerLabel={`${t('addMenuItem')}`}
                                triggerIcon={<IoAddOutline className="w-4 h-4"/>}
                                headerLabel="Add a New Menu Item"
                                description="Enter the details of the new menu item, including name, description, and price."
                            >
                                <RoleGate allowedRole={UserRole.ADMIN}>
                                    <MenuItemForm selectedRestaurant={selectedRestaurant}
                                                  menuCategories={menuCategories}/>
                                </RoleGate>
                            </DialogWrapper>
                        </div>
                    ) : (
                        <DrawerWrapper
                            triggerLabel={`${t('addMenuItem')}`}
                            triggerIcon={<IoAddOutline className="w-4 h-4 me-2"/>}
                            headerLabel="Add a New Menu Item"
                            description="Enter the details of the new menu item, including name, description, and price."
                        >
                            <RoleGate allowedRole={UserRole.ADMIN}>
                                <MenuItemForm selectedRestaurant={selectedRestaurant} menuCategories={menuCategories}/>
                            </RoleGate>
                        </DrawerWrapper>
                    )}
                </TabsContent>
            </Tabs>
        </main>
    );
};


export default Main;