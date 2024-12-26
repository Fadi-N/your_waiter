'use client'

import React, {useEffect, useState} from 'react';

import {MenuCategory, MenuItem} from "@prisma/client";
import MenuItemCard from "@/components/menu-item-card";
import {useRestaurantContext} from "@/context/restaurant-context";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {BsPencil} from "react-icons/bs";
import {FaPlus} from "react-icons/fa6";
import {Separator} from "@/components/ui/separator";
import MenuItemForm from "@/components/admin/forms/menu-item-form";
import {getCategoriesByRestaurant} from "@/actions/admin/menu-category";
import SkeletonCard from "@/components/skeleton-card";

const MenuPage = () => {
    const {menuItems, selectedRestaurant} = useRestaurantContext();

    const [loading, setLoading] = useState<boolean>(true);
    const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
    const [crudIcons, setCrudIcons] = useState<Record<string, boolean>>({
        save: false,
        edit: false,
        add: false,
    });

    useEffect(() => {
        const fetchMenuCategory = async () => {
            if (selectedRestaurant.id === '') {
                return
            }

            setLoading(true);
            try {
                const categories = await getCategoriesByRestaurant(selectedRestaurant.id);
                setMenuCategories(categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuCategory();
    }, [selectedRestaurant]);

    const handleCrudIcons = (value: string) => {
        setCrudIcons((prev) => ({
            ...prev,
            [value]: !prev[value],
        }))
    }

    return (
        <div className="border rounded-xl w-full h-full p-4">
            <div className="flex flex-row items-center justify-end space-x-4">
                <div className="flex space-x-2 crud-container">
                    <TooltipProvider>
                        <Dialog>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="rounded-full bg-[#fbb627] hover:bg-[#fbb627]"
                                            variant="secondary"
                                            size="sm"
                                            onMouseEnter={() => handleCrudIcons("edit")}
                                            onMouseLeave={() => handleCrudIcons("edit")}
                                        >
                                            {crudIcons.edit && <BsPencil className="w-3 h-3"/>}
                                        </Button>
                                    </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent className="me-2 bg-[#fbb627]" side="left">
                                    <p>Edit current worksheet</p>
                                </TooltipContent>
                            </Tooltip>

                            <DialogContent>
                                <DialogTitle>Edit </DialogTitle>
                                <DialogDescription>
                                    Modify the worksheet details below. Save your changes or delete the worksheet if it
                                    is no longer needed.
                                </DialogDescription>
                                <hr/>
                                <div className="overflow-y-auto max-h-[70vh]">

                                </div>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="rounded-full bg-[#1cc038] hover:bg-[#1cc038]"
                                            variant="secondary"
                                            size="sm"
                                            onMouseEnter={() => handleCrudIcons("add")}
                                            onMouseLeave={() => handleCrudIcons("add")}
                                        >
                                            {crudIcons.add && <FaPlus className="w-3 h-3"/>}
                                        </Button>
                                    </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent className="me-2 bg-[#1cc038]" side="left">
                                    <p>Create new menu item</p>
                                </TooltipContent>
                            </Tooltip>

                            <DialogContent>
                                <DialogTitle>Create New Menu Item</DialogTitle>
                                <DialogDescription>
                                    Enter the details of the new menu item, including name, description, and price.
                                </DialogDescription>
                                <hr/>
                                <div className="overflow-y-auto max-h-[70vh]">
                                    <MenuItemForm restaurantId={selectedRestaurant.id} menuCategories={menuCategories}/>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </TooltipProvider>
                </div>
            </div>
            <Separator className="my-4"/>
            <div className="flex flex-col">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {loading ? (
                        <SkeletonCard/>
                    ) : (
                        <>
                            {menuItems?.map((item: MenuItem) => (
                                <MenuItemCard key={item.id} item={item}/>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuPage;