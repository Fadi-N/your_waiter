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
        message: "Name is required"
    })
})

export const CreateRestaurantWithQRCodeSchema  = z.object({
    restaurantName: z.string()
        .min(1, {message: "Restaurant name is required"}),
    numberOfTables: z.string()
        .min(1, {message: "Number of tables is required"})
        .refine(val => {
            const num = parseInt(val, 10);
            return !isNaN(num) && num > 0;
        }, {message: "Number of tables must be a number greater than 0"})
});
