'use client'

import React, {createContext, useContext, useEffect, useState} from 'react';
import {MenuItem, Table} from "@prisma/client";
import {getTablesByRestaurant} from "@/actions/admin/restaurant";
import {getMenuItemsByRestaurantId} from "@/actions/admin/menu";

interface RestaurantContextProps {
    selectedRestaurant: string;
    setSelectedRestaurant: (id: string) => void;
    tables: Table[];
    menuItems: MenuItem[] | null;
    loading: boolean;
}

const RestaurantContext = createContext<RestaurantContextProps | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedRestaurant, setSelectedRestaurant] = useState<string>(''); // Default value
    const [tables, setTables] = useState<Table[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!selectedRestaurant) return;

        const fetchTables = async () => {
            const data = await getTablesByRestaurant(selectedRestaurant);
            setTables(data);
        };

        const fetchMenuItems = async () => {
            const data = await getMenuItemsByRestaurantId(selectedRestaurant);
            setMenuItems(data);
            setLoading(false);
        };

        setLoading(true);
        //fetchTables();
        //fetchMenuItems();
    }, [selectedRestaurant]);

    return (
        <RestaurantContext.Provider
            value={{
                selectedRestaurant,
                setSelectedRestaurant,
                tables,
                menuItems,
                loading,
            }}
        >
            {children}
        </RestaurantContext.Provider>
    );
};

export const useRestaurantContext = (): RestaurantContextProps => {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error('useRestaurantContext must be used within a RestaurantProvider');
    }
    return context;
};
