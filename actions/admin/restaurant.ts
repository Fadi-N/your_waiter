'use server'

import {db} from "@/lib/db";

export const getRestaurants = async () => {
    return await db.restaurant.findMany();
}

export const getTablesByRestaurant = async (restaurantId: string) => {
    return await db.table.findMany({
        where: {restaurantId}
    })
}