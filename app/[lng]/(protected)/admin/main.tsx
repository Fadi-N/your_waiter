'use client'

import React, {useEffect, useState} from 'react';
import SelectWrapper from "@/components/select-wrapper";
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

interface MainProps {
    restaurants: Restaurant[]
    menuCategories: MenuCategory[]
}

const Main = ({restaurants, menuCategories}: MainProps) => {
    const {lng} = useParams();
    const { t } = useTranslation(lng, "navbar")

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
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded-full mb-6">
                <SelectWrapper
                    items={restaurants.map(restaurant => ({
                        id: restaurant.id,
                        label: restaurant.name
                    }))}
                    placeholder={`${t('restaurantSelect')}`}
                    selectLabel="Restaurants"
                    onChange={setSelectedRestaurant}
                />

                <div className="relative">
                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"/>
                    <Input type="text" placeholder={`${t('search')}`} className="pl-10 rounded-full"/>
                </div>

                <div className="flex justify-end gap-x-2">
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
                    <Button
                        className="rounded-full"
                        variant="ghost"
                    >
                        <CiEdit className="w-4 h-4 me-2"/>
                        {`${t('editRestaurant')}`}
                    </Button>
                    <Button
                        className="rounded-full"
                        variant="ghost"
                    >
                        <IoMdDownload className="w-4 h-4 me-2"/>
                        {`${t('downloadQRCodes')}`}
                    </Button>
                </div>
            </div>

            <div className="flex gap-x-6 overflow-hidden">
                <div className="w-1/5 bg-neutral-800 text-white rounded-3xl overflow-y-auto">
                    <Sidebar/>
                </div>
                <div className="w-4/5 bg-gray-100 p-4 rounded-3xl overflow-y-auto">
                    {/*<TableList selectedRestaurant={selectedRestaurant} tables={tables}/>*/}
                    <CategoryForm selectedRestaurant={selectedRestaurant}/>
                    <MenuItemForm selectedRestaurant={selectedRestaurant} menuCategories={menuCategories}/>
                </div>
            </div>
        </main>
    );
};


export default Main;