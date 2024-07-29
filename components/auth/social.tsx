import React from 'react';
import {Button} from "@/components/ui/button";
import {FaGoogle} from "react-icons/fa";

const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={()=>{}}
            >
                <FaGoogle className="h-5 w-5"/>
            </Button>
        </div>
    );
};

export default Social;