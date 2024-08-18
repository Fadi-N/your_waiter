import React from 'react';
import Navbar from "@/app/[lng]/(protected)/_components/navbar";

const ProtectedLayout = ({children}) => {
    return (
        <div className="mx-6">
            <Navbar/>
            {children}
        </div>
    );
};

export default ProtectedLayout;