'use server'

import * as z from "zod";
import {SaveWorksheetSchema} from "@/schemas";
import {db} from "@/lib/db";



export const saveWorksheet = async (values: z.infer<typeof SaveWorksheetSchema>) => {
    const validateFields = SaveWorksheetSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields!" };
    }

    const { name, description, tiles, restaurantId } = validateFields.data;


    try {
        const existingWorksheet = await db.worksheet.findFirst({
            where: {
                name: name,
                restaurantId: restaurantId,
            },
        });

        console.log("Query result:", existingWorksheet);

        if (existingWorksheet) {
            return { error: "Worksheet with this name already exists for this restaurant." };
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

        return { success: "Worksheet saved successfully!", worksheet };
    } catch (error) {
        console.error("Error saving worksheet:", error);
        return { error: "Failed to save worksheet." };
    }
};