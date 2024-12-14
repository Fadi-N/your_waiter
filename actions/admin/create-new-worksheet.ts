'use server';

import * as z from "zod";
import QRCode from 'qrcode';
import {CreateNewWorksheetSchema, CreateRestaurantWithQRCodeSchema} from "@/schemas";
import {db} from "@/lib/db";

export const createNewWorksheet  = async (values: z.infer<typeof CreateNewWorksheetSchema>, userId: string) => {
    const validateFields = CreateNewWorksheetSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid fields!"};
    }

    const {worksheetName} = validateFields.data;

    try {
        // Check if restaurant name already exists for this user
        const existingWorksheet = await db.worksheet.findFirst({
            where: {
                name: worksheetName,
                userId: userId,
            },
        });

        if (existingWorksheet) {
            return { error: "Worksheet name already exists." };
        }

        // Create the restaurant
        const restaurant = await db.worksheet.create({
            data: {
                name: worksheetName,
                userId: userId,
            },
        });

        return {success: "Worksheet created successfully!"};
    } catch (error) {
        return {error: "Failed to create worksheet."}
    }
};
