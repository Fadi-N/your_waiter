'use client'

import React from 'react';

import {MenuItem} from "@prisma/client";
import MenuItemCard from "@/components/menu-item-card";
import {useRestaurantContext} from "@/context/RestaurantContext";

const MenuPage = () => {
    const { menuItems } = useRestaurantContext();

    return (
        <div className="border rounded-xl w-full h-full p-4">
            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(347.5px,1fr))]">
                {menuItems?.map((item: MenuItem) => (
                    <MenuItemCard key={item.id} item={item}/>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;