import React from 'react';
import CardWrapper from "@/components/auth/card-wrapper";
import {FaExclamationTriangle} from "react-icons/fa";

const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong!"
            backButtonHref="/auth/login"
        >
            <div className="w-full flex items-center justify-center">
                <FaExclamationTriangle className="text-destructive w-5 h-5"/>
            </div>
        </CardWrapper>
    );
};

export default ErrorCard;