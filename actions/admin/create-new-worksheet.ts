'use server';

import * as z from "zod";
import {CreateNewWorksheetSchema} from "@/schemas";
import {db} from "@/lib/db";

export const createNewWorksheet  = async (values: z.infer<typeof CreateNewWorksheetSchema>, restaurantId: string) => {
    const validateFields = CreateNewWorksheetSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid fields!"};
    }

    const {worksheetName} = validateFields.data;

    try {
        // Check if worksheet name already exists for this user
        const existingWorksheet = await db.worksheet.findFirst({
            where: {
                name: worksheetName,
                restaurantId: restaurantId,
            },
        });

        if (existingWorksheet) {
            return { error: "Worksheet name already exists." };
        }

        // Create the worksheet
        const worksheet = await db.worksheet.create({
            data: {
                name: worksheetName,
                restaurantId: restaurantId,
            },
        });

        return {success: "Worksheet created successfully!"};
    } catch (error) {
        return {error: "Failed to create worksheet."}
    }
};
