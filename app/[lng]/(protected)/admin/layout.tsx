import React from 'react';
import Sidebar from "@/app/[lng]/(protected)/_components/sidebar";
import {getRestaurants} from "@/actions/admin/restaurant";
import {RestaurantProvider} from "@/context/restaurant-context";

const AdminLayout: React.FC<{ children: React.ReactNode }> = async ({children}) => {
    const restaurants = await getRestaurants();

    return (
        <RestaurantProvider>
            <div className=" flex gap-2 w-screen h-screen p-2">
                <Sidebar restaurants={restaurants}/>
                {children}
            </div>
        </RestaurantProvider>
    );
};

export default AdminLayout;