'use client'

import Main from "@/app/[lng]/(protected)/[restaurant]/menu/main";
import {getMenuItems} from "@/actions/admin/menu";
import {useEffect, useState} from "react";
import {getMenuCategory} from "@/actions/admin/menu-category";

export default function MenuPage({params: {lng, restaurant}}) {
    const [menuItems, setMenuItems] = useState([]);
    const [MenuCategories, setMenuCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            setLoading(true);
            try {
                const items = await getMenuItems(restaurant);
                setMenuItems(items);

                const categories = await getMenuCategory(restaurant);
                setMenuCategories(categories);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [restaurant]);

    return (
        <Main menuItems={menuItems} MenuCategories={MenuCategories} loading={loading}/>
    )
}
