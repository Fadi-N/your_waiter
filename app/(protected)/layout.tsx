import React from 'react';
import Navbar from "@/app/(protected)/_components/navbar";

const ProtectedLayout = ({children}) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-110 items-center justify-center">
            <Navbar/>
            {children}
        </div>
    );
};

export default ProtectedLayout;