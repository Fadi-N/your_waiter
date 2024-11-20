import React from 'react';
import {getRestaurants} from "@/actions/admin/restaurant";
import Main from "@/app/[lng]/(protected)/admin/main";
import {getMenuCategory} from "@/actions/admin/menu-category";
import {getMenuItems} from "@/actions/admin/menu";

const AdminPage: React.FC<{ children: React.ReactNode }> = async () => {
    const restaurants = await getRestaurants();
    const menuCategories = await getMenuCategory();
    return (
        <Main restaurants={restaurants} menuCategories={menuCategories}/>
    )
};

export default AdminPage;