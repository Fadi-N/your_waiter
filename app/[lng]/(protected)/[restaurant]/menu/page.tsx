import Main from "@/app/[lng]/(protected)/[restaurant]/menu/main";
import {getMenuItems} from "@/actions/admin/menu";

export default async function MenuPage({params: {lng, restaurant}}) {
    const menuItems = await getMenuItems(restaurant);
    console.log("MENU: ", menuItems)

    return (
        <Main menuItems={menuItems}/>
    )
}
