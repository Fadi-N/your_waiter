
import React from 'react';
import Sidebar from "@/app/[lng]/(protected)/_components/sidebar";
import {getRestaurants} from "@/actions/admin/restaurant";

const AdminLayout = async ({children}) => {
    const restaurants = await getRestaurants();

    return (
        <div className=" flex gap-2 w-screen h-screen p-2">
            <Sidebar restaurants={restaurants}/>
            {children}
        </div>
    );
};

export default AdminLayout;