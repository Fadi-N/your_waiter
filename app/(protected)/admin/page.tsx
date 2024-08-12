import React, {useEffect, useState} from 'react';
import RoleGate from "@/components/auth/role-gate";
import {Table, UserRole} from "@prisma/client";
import GenerateQrcodeForm from "@/components/admin/generate-qrcode-form";
import {CiEdit, CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {IoAddOutline} from "react-icons/io5";
import Sidebar from "@/app/(protected)/Sidebar";
import {IoMdDownload} from "react-icons/io";
import {getRestaurants, getTablesByRestaurant} from "@/actions/admin/restaurant";
import DialogWrapper from "@/components/dialog-wrapper";
import SelectWrapper from "@/components/select-wrapper";
import TableList from "@/components/admin/table-list";
import Main from "@/actions/admin/main";

const AdminPage = async () => {
    const restaurants = await getRestaurants();


    return (
        <Main restaurants={restaurants}/>
    )
};

export default AdminPage;