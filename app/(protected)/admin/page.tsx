import React from 'react';
import {getRestaurants} from "@/actions/admin/restaurant";
import Main from "@/app/(protected)/admin/main";

const AdminPage = async () => {
    const restaurants = await getRestaurants();

    return (
        <Main restaurants={restaurants}/>
    )
};

export default AdminPage;