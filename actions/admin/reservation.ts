'use server'

import * as z from "zod";
import {SaveWorksheetSchema} from "@/schemas";
import {db} from "@/lib/db";


export const getWorksheets = async (restaurantId: string) => {

    const categories = await db.worksheet.findMany({
        where: {
            restaurantId: restaurantId,
        },
    });

    if (!categories || categories.length === 0) {
        return {error: "Worksheets not found for the specified restaurant."};
    }

    return categories;
};

export const deleteActiveWorksheet = async (restaurantId: string, worksheetId: string) => {
    try {
        if (!worksheetId) {
            return {error: "Invalid worksheet data. Worksheet ID is required."};
        }

        if (!restaurantId) {
            return {error: "Invalid restaurant ID."};
        }

        const existingWorksheet = await db.worksheet.findUnique({
            where: {
                id: worksheetId,
                restaurantId: restaurantId,
            },
        });

        if (!existingWorksheet) {
            return {error: "Worksheet not found or does not belong to this restaurant."};
        }

        await db.worksheet.delete({
            where: {
                id: worksheetId,
                restaurantId: restaurantId,
            },
        });

        return {success: "Worksheet deleted successfully!"};
    } catch (error) {
        return {error: "Failed to delete worksheet."}
    }
};

export const saveWorksheet = async (values: z.infer<typeof SaveWorksheetSchema>) => {
    const validateFields = SaveWorksheetSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid fields!"};
    }

    const {name, description, tiles, restaurantId} = validateFields.data;


    try {
        const existingWorksheet = await db.worksheet.findFirst({
            where: {
                name: name,
                restaurantId: restaurantId,
            },
        });

        if (existingWorksheet) {
            return {error: "Worksheet with this name already exists for this restaurant."};
        }

        const worksheet = await db.worksheet.create({
            data: {
                name: name,
                description: description,
                restaurantId: restaurantId,
                tiles: {
                    create: tiles.map(tile => ({
                        type: tile.type,
                        x: tile.x,
                        y: tile.y,
                        width: tile.width,
                        height: tile.height,
                        fill: tile.fill,
                        src: tile.src || null,
                    })),
                },
            },
        });

        return {success: "Worksheet saved successfully!", worksheet};
    } catch (error) {
        console.error("Error saving worksheet:", error);
        return {error: "Failed to save worksheet."};
    }
};