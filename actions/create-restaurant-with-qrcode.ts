'use server';

import * as z from "zod";
import QRCode from 'qrcode';
import {CreateRestaurantWithQRCodeSchema} from "@/schemas";
import {db} from "@/lib/db";

export const createRestaurantWithQRCode  = async (values: z.infer<typeof CreateRestaurantWithQRCodeSchema>, userId: string) => {
    const validateFields = CreateRestaurantWithQRCodeSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid fields!"};
    }

    const {restaurantName, numberOfTables} = validateFields.data;

    try {
        // Check if restaurant name already exists for this user
        const existingRestaurant = await db.restaurant.findFirst({
            where: {
                name: restaurantName,
                userId: userId,
            },
        });

        if (existingRestaurant) {
            return { error: "Restaurant name already exists." };
        }

        // Create the restaurant
        const restaurant = await db.restaurant.create({
            data: {
                name: restaurantName,
                userId: userId,
            },
        });

        // Generate tables and QR codes
        for (let i = 1; i <= numberOfTables; i++) {
            const url = `http://localhost:3000/menu?table=${i}`;
            const qrCode = await QRCode.toDataURL(url);

            await db.table.create({
                data: {
                    tableNumber: i,
                    qrCode,
                    restaurantId: restaurant.id,
                },
            });
        }

        return {success: "Restaurant and QR codes generated successfully!"};
    } catch (error) {
        return {error: "Failed to generate restaurant and QR codes."}
    }
};
