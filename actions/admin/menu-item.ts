'use server';

import * as z from "zod";
import {MenuItemSchema} from "@/schemas";
import {db} from "@/lib/db";

export const MenuItem = async (values: z.infer<typeof MenuItemSchema>, restaurantId: string) => {
    const validateFields = MenuItemSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid fields!"};
    }

    const {itemName, menuCategory, description, price, imageUrl} = validateFields.data;

    try {
        // Check if a menu item with the same name already exists in the specified restaurant and category
        const existingMenuItem = await db.menuItem.findFirst({
            where: {
                name: itemName,
                restaurantId: restaurantId,
                menuCategoryId: menuCategory,
            },
        })

        if (existingMenuItem) {
            return {error: "Menu item already exists in this category for the specified restaurant."};
        }

        // Create the new menu item
        const newMenuItem = await db.menuItem.create({
            data: {
                name: itemName,
                description: description,
                price: price,
                imageUrl: imageUrl,
                menuCategoryId: menuCategory,
                restaurantId: restaurantId,
            },
        });

        return {success: "Menu item created successfully!"};
    } catch (error) {
        return {error: "Failed to create menu item."}
    }
};
