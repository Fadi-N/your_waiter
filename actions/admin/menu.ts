'use server'

import {db} from "@/lib/db";

/*const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}*/

export const getMenuItems = async (restaurantId: string) => {
    //const formattedName = capitalizeFirstLetter(restaurantId);

    const restaurant = await db.menuItem.findMany({
        where: {
            Restaurant: {
                id: restaurantId,
            },
        },
        include: {
            MenuCategory: true,
        },
    })

    if (!restaurant) {
        return {error: "Restaurant not found. Please check the restaurant name and try again."};
    }

    return restaurant;
}

export const getMenuItemsByRestaurantId = async (restaurantId: string) => {
    const restaurant = await db.menuItem.findMany({
        where: {
            Restaurant: {
                id: restaurantId,
            },
        },
        include: {
            MenuCategory: true,
        },
    })

    if (!restaurant) {
        return {error: "Restaurant not found. Please check the restaurant name and try again."};
    }

    return restaurant;
}