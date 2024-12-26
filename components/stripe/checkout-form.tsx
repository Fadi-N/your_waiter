import React, {FormEvent} from 'react';
import {AddressElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import DialogWrapper from "@/components/wrappers/dialog-wrapper";
import {IoAddOutline} from "react-icons/io5";
import {Button} from "@/components/ui/button";

interface CheckoutFormProps {
    isLoading: boolean;
}

const CheckoutForm = ({isLoading}: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (!elements || !stripe) {
                return;
            }

            const result = await stripe?.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "http://localhost:3000/"
                },
                redirect: "if_required"
            })

            if (result.error) {
                console.log(result.error.message)
            } else {
                console.log("PAYMENT SUCCESSFULL!!!")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <div className="font-medium text-2xl">How would you like to pay?</div>
            <form onSubmit={handleSubmitForm} className="flex flex-col space-y-6">
                <PaymentElement
                    options={{
                        fields: {
                            billingDetails: 'never',
                        }
                    }}
                />
                <AddressElement options={{
                    mode: "billing",
                    allowedCountries: ["PL"]
                }}/>

                <Button
                    className="w-full"
                    isLoading={isLoading}
                    color="primary"
                    type="submit"
                >
                    Place order
                </Button>
            </form>
        </>
    );
};

export default CheckoutForm;