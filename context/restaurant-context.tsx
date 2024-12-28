'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {MenuItem, Restaurant, Table} from "@prisma/client";
import { getTablesByRestaurant } from "@/actions/admin/restaurant";
import {getMenuItemsByRestaurantId} from "@/actions/admin/menu";

const RestaurantContext = createContext<RestaurantContextProps | undefined>(undefined);

interface RestaurantContextProps {
    selectedRestaurant: Restaurant | null;
    setSelectedRestaurant: (restaurant: Restaurant | null) => void;
    tables: Table[];
    menuItems: MenuItem[] | null;
    restaurants: Restaurant[];
    loading: boolean;
}

export const RestaurantProvider: React.FC<{ children: React.ReactNode, restaurants: Restaurant[] }> = ({ children, restaurants }) => {
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(restaurants[0] || null);
    const [tables, setTables] = useState<Table[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!selectedRestaurant) return;

        const fetchTables = async () => {
            try {
                const data = await getTablesByRestaurant(selectedRestaurant.id);
                setTables(data);
            } catch (error) {
                console.error("Error fetching tables:", error);
            }
        };

        const fetchMenuItems = async () => {
            try {
                const data = await getMenuItemsByRestaurantId(selectedRestaurant.id);
                setMenuItems(data);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchTables();
        fetchMenuItems();
    }, [selectedRestaurant]);

    return (
        <RestaurantContext.Provider
            value={{
                selectedRestaurant,
                setSelectedRestaurant,
                tables,
                menuItems,
                restaurants,
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
        throw new Error('useRestaurantContext must be used within a RestaurantProviderClient');
    }
    return context;
};

export default RestaurantProvider;