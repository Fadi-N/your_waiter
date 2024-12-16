import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters required"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    }),
    surname: z.string().min(1, {
        message: "Surname is required"
    })
})

export const CreateRestaurantWithQRCodeSchema = z.object({
    restaurantName: z.string()
        .min(1, {message: "Restaurant name is required"}),
    numberOfTables: z.string()
        .min(1, {message: "Number of tables is required"})
        .refine(val => {
            const num = parseInt(val, 10);
            return !isNaN(num) && num > 0;
        }, {message: "Number of tables must be a number greater than 0"})
});

export const CategorySchema = z.object({
    categoryName: z.string()
        .min(1, {message: "Category name is required"})
        .max(50, {message: "Category name must be less than 50 characters"})
});
export const MenuItemSchema = z.object({
    imageUrl: z.string().url({ message: "A valid image URL is required" }).optional(),
    itemName: z.string()
        .min(1, { message: "Item name is required" })
        .max(50, { message: "Item name must be less than 50 characters" }),
    menuCategory: z.string()
        .min(1, { message: "Menu category is required" }),
    description: z.string().optional(),
    price: z.preprocess((val) => {
        // Check if value is a string and convert to float
        if (typeof val === 'string') {
            const parsed = parseFloat(val);
            return isNaN(parsed) ? undefined : parsed;
        }
        // Return value as is if it's already a number
        return val;
    }, z.number().min(0.01, { message: "Price must be greater than zero" }))
});

export const TileSchema = z.object({
    type: z.enum(['table', 'bar', 'image']),
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
    fill: z.string().optional(),
    src: z.string().optional(),
});

export const SaveWorksheetSchema = z.object({
    worksheetId: z.string(),
    description: z.string().optional(),
    restaurantId: z.string(),
    tiles: z.array(TileSchema),
});

export const CreateNewWorksheetSchema = z.object({
    worksheetName: z.string()
        .min(1, {message: "Worksheet name is required"}),
});