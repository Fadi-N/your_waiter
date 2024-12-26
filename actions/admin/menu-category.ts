'use server';

import * as z from "zod";
import {CategorySchema} from "@/schemas";
import {db} from "@/lib/db";

/*const capitalizeFirstLetter = (string:string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}*/

export const getMenuCategory = async (restaurantId:string) => {
    //const formattedName = capitalizeFirstLetter(restaurantName);

    const categories = await db.menuCategory.findMany({
        where: {
            Restaurant: {
                id: restaurantId,
            },
        },
    });

    if (!categories || categories.length === 0) {
        return { error: "Categories not found for the specified restaurant." };
    }

    return categories;
};

export const getCategoriesByRestaurant = async (restaurantId: string) => {
    return await db.menuCategory.findMany({
        where: {restaurantId}
    })
}

export const categoryMenu = async (values: z.infer<typeof CategorySchema>, restaurantId: string) => {
    const validateFields = CategorySchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid fields!"};
    }

    const {categoryName} = validateFields.data;

    try {
        // Check if category name already exists for this menu
        const existingCategory = await db.menuCategory.findFirst({
            where: {
                name: categoryName,
                restaurantId: restaurantId
            }
        });

        if (existingCategory) {
            return {error: "Category already exists for this restaurant."};
        }

        // Create the category
        const newCategory = await db.menuCategory.create({
            data: {
                name: categoryName,
                restaurantId: restaurantId,
            },
        });

        return {success: "Category created successfully!"};

    } catch (error) {
        return {error: "Failed to create Category."}
    }
};
