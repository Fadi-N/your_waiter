'use client'

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";
import {Progress} from "@/components/ui/progress";
import CustomerReservationForm from "@/components/customer-reservation-form";
import CustomerSelectionForm from "@/components/customer-selection-form";
import {FaArrowLeftLong} from "react-icons/fa6";

const ReservationPage = () => {
    const {restaurantId} = useParams<{ restaurantId: string }>();

    const [progress, setProgress] = useState({
        currentStep: 'Details',
        steps: {
            Details: 100,
            Selection: 0,
            Summary: 0,
        },
    });


    const handleContinue = () => {
        setProgress((prev) => {
            const nextStep =
                prev.currentStep === 'Details'
                    ? 'Selection'
                    : prev.currentStep === 'Selection'
                        ? 'Summary'
                        : 'Summary';

            return {
                currentStep: nextStep,
                steps: {
                    ...prev.steps,
                    [nextStep]: 100,
                },
            };
        });
    };

    const handleGoBack = () => {
        setProgress((prev) => {
            const previousStep =
                prev.currentStep === 'Summary'
                    ? 'Selection'
                    : prev.currentStep === 'Selection'
                        ? 'Details'
                        : 'Details';

            return {
                currentStep: previousStep,
                steps: {
                    ...prev.steps,
                    [prev.currentStep]: 0,
                },
            };
        });
    };

    return (
        <div className="flex flex-col justify-between h-full py-6">
            <div className="flex flex-1 flex-col space-y-6 2xl:space-y-12">
                <div>
                    <Button
                        variant="default"
                        size="sm"
                        onClick={handleGoBack}
                        disabled={progress.currentStep === 'Details'}
                    >
                        <FaArrowLeftLong className="w-4 h-4 me-2"/>
                        Go Back
                    </Button>
                </div>
                <div>
                    {progress.currentStep === 'Details' && (
                        <CustomerReservationForm/>
                    )}
                    {progress.currentStep === 'Selection' && (
                        <CustomerSelectionForm restaurantId={restaurantId!}/>
                    )}
                    {progress.currentStep === 'Summary' && (
                        <>List all details</>
                    )}
                </div>

            </div>

            <div className="flex flex-col space-y-6 2xl:space-y-12">
                <Button
                    size="sm"
                    onClick={handleContinue}
                >
                    {progress.currentStep !== 'Summary' ? "Continue" : "Book Your Reservation"}
                </Button>
                <div className="flex gap-12 flex-1 items-end">
                    <div className="flex flex-col gap-2 w-full">
                        <p>Details</p>
                        <Progress
                            value={progress.steps.Details}
                            className="w-full transition-transform !duration-1000"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <p>Selection</p>
                        <Progress
                            value={progress.steps.Selection}
                            className="w-full transition-transform !duration-1000"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <p>Summary</p>
                        <Progress
                            value={progress.steps.Summary}
                            className="w-full transition-transform !duration-1000"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ReservationPage;