'use client'

import Main from "@/app/[lng]/(protected)/[restaurant]/menu/main";
import {getMenuItems} from "@/actions/admin/menu";
import {useEffect, useState} from "react";

export default function MenuPage({params: {lng, restaurant}}) {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            setLoading(true);
            try {
                const items = await getMenuItems(restaurant);
                setMenuItems(items);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [restaurant]);

    return (
        <Main menuItems={menuItems} loading={loading}/>
    )
}
