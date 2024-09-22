import React, {FormEvent} from 'react';
import {AddressElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import DialogWrapper from "@/components/dialog-wrapper";
import {IoAddOutline} from "react-icons/io5";
import {Button} from "@/components/ui/button";

interface CheckoutFormProps {
    isLoading: boolean;
}

const CheckoutForm = ({ isLoading } : CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitForm = async(e: FormEvent) => {
        e.preventDefault();

        try{
            if (!elements || !stripe){
                return;
            }

            const result = await stripe?.confirmPayment({
                elements,
                confirmParams:{
                    return_url: "http://localhost:3000/"
                },
                redirect: "if_required"
            })

            if (result.error){
                console.log(result.error.message)
            }else{
                console.log("PAYMENT SUCCESSFULL!!!")
            }

        }catch (error){
            console.log(error)
        }
    }

    return (
        <DialogWrapper
            triggerLabel="Purchase"
            triggerIcon={<IoAddOutline />}
            headerLabel="Complete your subscription purchase"
            description="Please complete your payment details below."
        >
            <form onSubmit={handleSubmitForm}>
                <PaymentElement />
                <AddressElement options={{
                    mode: "billing",
                    allowedCountries: ["PL"]
                }}/>
                {/* <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["US"],
          }}
        /> */}
                <div className="flex justify-center gap-4 mt-4">
                    <Button
                        isDisabled={isLoading}
                        variant="ghost"
                        color="danger"
                    >
                        Cancel
                    </Button>
                    <Button
                        isLoading={isLoading}
                        color="primary"
                        type="submit"
                    >
                        Pay
                    </Button>
                </div>
            </form>
        </DialogWrapper>
    );
};

export default CheckoutForm;