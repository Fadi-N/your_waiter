'use server'

import Stripe from "stripe";

export const createPaymentIntent = async (amount: number, description: string) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        typescript: true,
        apiVersion: "2024-06-20"
    });

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        description,
        currency: "PLN",
        payment_method_types: ["blik", "card"],
        payment_method_options: {
            blik: {},
        }
    })

    console.log(amount, description, stripe, paymentIntent);

    return paymentIntent;
}