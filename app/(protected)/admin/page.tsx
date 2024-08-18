import React from 'react';
import {getRestaurants} from "@/actions/admin/restaurant";
import Main from "@/app/(protected)/admin/main";
import {getMenuCategory} from "@/actions/admin/menu-category";

const AdminPage = async () => {
    const restaurants = await getRestaurants();
    const menuCategories = await getMenuCategory();

    return (
        <Main restaurants={restaurants} menuCategories={menuCategories}/>
    )
};

export default AdminPage;