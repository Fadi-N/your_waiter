import React from 'react';
import Main from "@/app/[lng]/(protected)/admin/main";
import {getRestaurants} from "@/actions/admin/restaurant";
import {getMenuCategory} from "@/actions/admin/menu-category";

const Menu = async () => {
    const restaurants = await getRestaurants();
    const menuCategories = await getMenuCategory();
    return (
        <div className="border rounded-xl w-full h-full">

        </div>
    );
};

export default Menu;