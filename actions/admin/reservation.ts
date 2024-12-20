'use server'

import * as z from "zod";
import {CreateNewWorksheetSchema, SaveWorksheetSchema} from "@/schemas";
import {db} from "@/lib/db";


export const getWorksheets = async (restaurantId: string) => {

    const categories = await db.worksheet.findMany({
        where: {
            restaurantId: restaurantId,
        },
        include: {
            tiles: true,
        }
    });

    if (!categories || categories.length === 0) {
        return {error: "Worksheets not found for the specified restaurant."};
    }

    return categories;
};

export const updateActiveWorksheet = async (restaurantId: string, worksheetId: string, values: z.infer<typeof CreateNewWorksheetSchema>) => {
    const validateFields = CreateNewWorksheetSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid fields!"};
    }

    const {worksheetName} = validateFields.data;

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

        await db.worksheet.update({
            where: {
                id: worksheetId,
                restaurantId: restaurantId,
            },
            data:{
                name: worksheetName
            }
        });

        return {success: "Worksheet updated successfully!"};
    } catch (error) {
        return {error: "Failed to update worksheet."}
    }
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

        await db.tile.deleteMany({
            where: {
                worksheetId: worksheetId,
            },
        });

        await db.worksheet.delete({
            where: {
                id: worksheetId,
                restaurantId: restaurantId,
            },
        });


        return {success: "Worksheet deleted successfully!"};
    } catch (error) {
        console.log(error)
        return {error: "Failed to delete worksheet."}
    }
};

export const saveWorksheet = async (values: z.infer<typeof SaveWorksheetSchema>) => {
    const validateFields = SaveWorksheetSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid fields!"};
    }

    const {worksheetId, description, tiles, restaurantId} = validateFields.data;

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

        await db.worksheet.update({
            where: {
                id: worksheetId,
                restaurantId: restaurantId,
            },
            data: {
                tiles: {
                    upsert: tiles.map(tile => ({
                        where: { uuid: tile.uuid },
                        create: {
                            uuid: tile.uuid,
                            type: tile.type,
                            x: tile.x,
                            y: tile.y,
                            width: tile.width,
                            height: tile.height,
                            fill: tile.fill || null,
                            src: tile.src || null,
                        },
                        update: {
                            type: tile.type,
                            x: tile.x,
                            y: tile.y,
                            width: tile.width,
                            height: tile.height,
                            fill: tile.fill || null,
                            src: tile.src || null,
                        },
                    })),
                    deleteMany: {
                        worksheetId: worksheetId,
                        uuid: { notIn: tiles.map(tile => tile.uuid) },
                    },
                },
            },
        });

        return {success: "Worksheet saved successfully!"};
    } catch (error) {
        console.log(error);
        return {error: "Failed to save worksheet."};
    }
};