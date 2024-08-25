'use client'

import React, {useEffect, useState} from 'react';
import SelectWrapper from "../../../../components/select-wrapper";
import {CiEdit, CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import DialogWrapper from "@/components/dialog-wrapper";
import {IoAddOutline} from "react-icons/io5";
import RoleGate from "@/components/auth/role-gate";
import {MenuCategory, Restaurant, Table, UserRole} from "@prisma/client";
import GenerateQrcodeForm from "@/components/admin/generate-qrcode-form";
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

interface MainProps {
    restaurants: Restaurant[]
    menuCategories: MenuCategory[]
}

const Main = ({restaurants, menuCategories}: MainProps) => {
    const {lng} = useParams();
    const {t} = useTranslation(lng)

    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
    const [tables, setTables] = useState<Table[]>([]);

    useEffect(() => {
        if (selectedRestaurant) {
            // Fetch tables for the selected restaurant
            const fetchTables = async () => {
                const data = await getTablesByRestaurant(selectedRestaurant);
                setTables(data);
            };

            fetchTables();
        }
    }, [selectedRestaurant]);

    return (
        <main>
            <div className="flex flex-wrap justify-between items-center bg-gray-100 p-2 rounded-2xl my-6 md:mt-0 md:flex-nowrap">
                <SelectWrapper
                    defaultValue={restaurants[0].id}
                    items={restaurants.map(restaurant => ({
                        id: restaurant.id,
                        label: restaurant.name
                    }))}
                    placeholder={`${t('restaurantSelect')}`}
                    selectLabel="Restaurants"
                    onChange={setSelectedRestaurant}
                />

                <div className="relative flex-1">
                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"/>
                    <Input type="text" placeholder={`${t('search')}`} className="pl-10 rounded-full"/>
                </div>

                <div className="flex w-full justify-between gap-x-2 mt-2 md:justify-end md:mt-0 md:w-auto">
                    {isDesktop ? (
                        <>
                            <DialogWrapper
                                triggerLabel={`${t('newRestaurant')}`}
                                triggerIcon={<IoAddOutline className="w-4 h-4"/>}
                                headerLabel="Create Restaurant QR Code"
                                description="Set up your restaurant profile and generate QR codes for table orders. Click create when you're done."
                            >
                                <RoleGate allowedRole={UserRole.ADMIN}>
                                    <GenerateQrcodeForm/>
                                </RoleGate>
                            </DialogWrapper>
                        </>
                    ) : (
                        <DrawerWrapper
                            triggerLabel={`${t('newRestaurant')}`}
                            triggerIcon={<IoAddOutline className="w-4 h-4"/>}
                            headerLabel="Create Restaurant QR Code"
                            description="Set up your restaurant profile and generate QR codes for table orders. Click create when you're done."
                        >
                            <RoleGate allowedRole={UserRole.ADMIN}>
                                <GenerateQrcodeForm/>
                            </RoleGate>
                        </DrawerWrapper>
                    )}
                    <Button
                        className="rounded-full"
                        variant="ghost"
                    >
                        <CiEdit className="w-4 h-4 me-2"/>
                        {`${t('editRestaurant')}`}
                    </Button>
                    {isDesktop ? (
                        <>
                            <DialogWrapper
                                triggerLabel={`${t('QRCodes')}`}
                                triggerIcon={<LiaQrcodeSolid className="w-4 h-4 me-2"/>}
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
                            <RoleGate allowedRole={UserRole.ADMIN}>
                                <TableList selectedRestaurant={selectedRestaurant} tables={tables}/>
                            </RoleGate>
                        </DrawerWrapper>
                    )}
                </div>
            </div>

            <Tabs defaultValue="category" className="flex flex-col gap-x-6 overflow-hidden md:flex-row">
                <TabsList
                    className="flex gap-2 p-2 h-full bg-neutral-800 text-white rounded-2xl overflow-y-auto md:w-1/5 md:flex-col"
                >
                    <TabsTrigger
                        className="rounded-full"
                        value="category"
                    >
                        {`${t('category')}`}
                    </TabsTrigger>
                    <TabsTrigger
                        className="rounded-full"
                        value="menu-item"
                    >
                        {`${t('menuItem')}`}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="category" className="bg-gray-100 p-4 rounded-2xl overflow-y-auto md:w-4/5 md:mt-0">
                    {isDesktop ? (
                        <>
                            <DialogWrapper
                                triggerLabel={`${t('addCategory')}`}
                                triggerIcon={<IoAddOutline className="w-4 h-4 me-2"/>}
                                headerLabel="Add a New Menu Category"
                                description="Provide the necessary details"
                            >
                                <RoleGate allowedRole={UserRole.ADMIN}>
                                    <CategoryForm selectedRestaurant={selectedRestaurant}/>
                                </RoleGate>
                            </DialogWrapper>
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
                <TabsContent value="menu-item" className="bg-gray-100 p-4 rounded-2xl overflow-y-auto md:w-4/5 md:mt-0">
                    {isDesktop ? (
                        <>
                            <DialogWrapper
                                triggerLabel={`${t('addMenuItem')}`}
                                triggerIcon={<IoAddOutline className="w-4 h-4 me-2"/>}
                                headerLabel="Add a New Menu Item"
                                description="Enter the details of the new menu item, including name, description, and price."
                            >
                                <RoleGate allowedRole={UserRole.ADMIN}>
                                    <MenuItemForm selectedRestaurant={selectedRestaurant} menuCategories={menuCategories}/>
                                </RoleGate>
                            </DialogWrapper>
                        </>
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