'use client';

import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils"; // Utility function for conditional classes
import {useParams, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {CiEdit, CiSearch} from "react-icons/ci";
import {useTranslation} from "@/app/i18n/client";
import UserButton from "@/components/auth/user-button";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {IoAddOutline, IoExitOutline} from "react-icons/io5";
import LogoutButton from "@/components/auth/logout-button";
import {MdOutlineCategory} from "react-icons/md";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import {useCurrentUser} from "@/hooks/use-current-user";
import SelectWrapper from "@/components/select-wrapper";
import {getTablesByRestaurant} from "@/actions/admin/restaurant";
import {getMenuItemsByRestaurantId} from "@/actions/admin/menu";
import {useMediaQuery} from "@/hooks/use-media-query";
import {Restaurant, Table, UserRole} from "@prisma/client";
import {PDFDownloadLink} from "@react-pdf/renderer";
import PdfDocument from "@/components/pdf-document";
import {IoMdDownload} from "react-icons/io";
import DialogWrapper from "@/components/dialog-wrapper";
import RoleGate from "@/components/auth/role-gate";
import NewRestaurantForm from "@/components/admin/new-restaurant-form";
import DrawerWrapper from "@/components/drawer-wrapper";
import EditRestaurantForm from "@/components/admin/edit-restaurant-form";
import {useRestaurantContext} from "@/context/restaurant-context";

interface SidebarProps {
    restaurants: Restaurant[]
}

const Sidebar: React.FC<SidebarProps> = ({restaurants}) => {
    const {lng} = useParams();
    const {t} = useTranslation(lng);

    const user = useCurrentUser();
    const { selectedRestaurant, setSelectedRestaurant, tables, loading } = useRestaurantContext();
    const router = useRouter();

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [selectedId, setSelectedId] = useState<string>("");

    const items = [
        {id: "category", label: "Food Categories"},
        {id: "menu-item", label: "Menu Management"},
        {id: "reservation-system", label: "Reservation System"},
        {id: "transaction-history", label: "Transaction History"},
    ];

    const handleNavigation = (id: string) => {
        setSelectedId(id);
        router.push(`/admin/${id}`);
    };

    return (
        <aside className="flex flex-col gap-2 h-full w-72 p-4 rounded-xl border justify-between">
            <div className="flex flex-col space-y-4">
                <p className="text-xl">LOGO</p>
                <div className="flex flex-col space-y-2">
                    <div className="flex gap-2">
                        <Avatar>
                            <AvatarImage src={user?.image || ""}/>
                            <AvatarFallback className="bg-slate-100">
                                <FaUser className="w-4 h-4"/>
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <p className="text-sm">{user?.email}</p>
                            <p className="text-xs">{user?.name}</p>
                        </div>
                    </div>
                    <div className="relative">
                        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"/>
                        <Input
                            className="pl-10 rounded-xl focus-visible:ring-offset-0 focus-visible:ring-0"
                            type="text"
                            placeholder={`${t('search')}`}
                        />
                    </div>
                </div>
                <div className="flex flex-col space-y-1">
                    <p className="text-xs">Restaurants</p>
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
                    {isDesktop ? (
                        <>
                            <DialogWrapper
                                triggerLabel={`${t('newRestaurant')}`}
                                triggerIcon={<IoAddOutline className="w-6 h-6"/>}
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

                <div className="flex flex-col space-y-1">
                    <p className="text-xs">Operations</p>
                    {items.map((item) => (
                        <Button
                            key={item.id}
                            variant="default"
                            size="sm"
                            className={cn(
                                "justify-start w-full",
                                selectedId === item.id && "bg-gray-700 text-white"
                            )}
                            onClick={() => handleNavigation(item.id)}
                        >
                            <MdOutlineCategory className="w-6 h-6 me-2"/>
                            {item.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col space-y-1">
                <PDFDownloadLink
                    document={<PdfDocument tables={tables}/>}
                    fileName="QRCodes.pdf"
                >
                    <Button
                        className="justify-start w-full"
                        variant="default"
                        size="sm"
                    >
                        <div className="me-2 border rounded-full p-1 d-flex items-center justify-center">
                            <IoMdDownload className="w-4 h-4"/>
                        </div>
                        QR codes
                    </Button>
                </PDFDownloadLink>
                <LogoutButton>
                    <div className="me-2 border rounded-full p-1 d-flex items-center justify-center">
                        <IoExitOutline className="h-4 w-4"/>
                    </div>
                    <span>Logout</span>
                </LogoutButton>

            </div>
        </aside>
    );
};

export default Sidebar;