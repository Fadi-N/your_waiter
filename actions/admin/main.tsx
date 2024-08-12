'use client'

import React, {useEffect, useState} from 'react';
import SelectWrapper from "@/components/select-wrapper";
import {CiEdit, CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import DialogWrapper from "@/components/dialog-wrapper";
import {IoAddOutline} from "react-icons/io5";
import RoleGate from "@/components/auth/role-gate";
import {Restaurant, Table, UserRole} from "@prisma/client";
import GenerateQrcodeForm from "@/components/admin/generate-qrcode-form";
import {Button} from "@/components/ui/button";
import {IoMdDownload} from "react-icons/io";
import Sidebar from "@/app/(protected)/Sidebar";
import TableList from "@/components/admin/table-list";
import {getTablesByRestaurant} from "@/actions/admin/restaurant";

interface  MainProps{
    restaurants: Restaurant[]
}

const Main = ({restaurants} :MainProps) => {
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
                    placeholder="Select a restaurant"
                    selectLabel="Restaurants"
                    onChange={setSelectedRestaurant}
                />

                <div className="relative">
                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"/>
                    <Input type="text" placeholder="Search" className="pl-10 rounded-full"/>
                </div>

                <div className="justify-end">
                    <DialogWrapper
                        triggerLabel="New Restaurant"
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
                        Edit Restaurant
                    </Button>
                    <Button
                        className="rounded-full"
                        variant="ghost"
                    >
                        <IoMdDownload className="w-4 h-4 me-2"/>
                        Download QR Codes
                    </Button>
                </div>
            </div>

            <div className="flex gap-x-6">
                <Sidebar/>
                <div className="w-4/5 bg-gray-100 p-4 rounded-3xl">
                    <TableList selectedRestaurant={selectedRestaurant} tables={tables}/>
                </div>
            </div>
        </main>
    );
};

export default Main;