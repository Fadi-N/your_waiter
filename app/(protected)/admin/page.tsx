import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import {UserRole} from "@prisma/client";
import GenerateQrcodeForm from "@/components/admin/generate-qrcode-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {CiEdit, CiSearch} from "react-icons/ci";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {IoAddOutline} from "react-icons/io5";
import Sidebar from "@/app/(protected)/Sidebar";
import {IoMdDownload} from "react-icons/io";

const AdminPage = () => {

    return (
        <main>
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded-full mb-6">
                <Select>
                    <SelectTrigger className="w-auto bg-transparent border-0">
                        <SelectValue placeholder="Select a restaurant"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Restaurants</SelectLabel>
                            <SelectItem value="restaurant1">Restaurant 1</SelectItem>
                            <SelectItem value="restaurant2">Restaurant 2</SelectItem>
                            <SelectItem value="restaurant3">Restaurant 3</SelectItem>
                            <SelectItem value="restaurant4">Restaurant 4</SelectItem>
                            <SelectItem value="restaurant5">Restaurant 5</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="relative">
                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"/>
                    <Input type="text" placeholder="Search" className="pl-10 rounded-full"/>
                </div>

                <div className="justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="rounded-full"
                                variant="ghost"
                            >
                                <IoAddOutline className="w-4 h-4 me-2"/>
                                New Restaurant
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create Restaurant QR Code</DialogTitle>
                                <DialogDescription>
                                    Set up your restaurant profile and generate QR codes for table orders. Click
                                    create when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <hr/>
                            <RoleGate allowedRole={UserRole.ADMIN}>
                                <GenerateQrcodeForm/>
                            </RoleGate>

                            {/*<DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>*/}
                        </DialogContent>
                    </Dialog>
                    <Button
                        className="rounded-full"
                        variant="ghost"
                    >
                        <CiEdit className="w-4 h-4 me-2"/>
                        Edit Restaurant
                    </Button>
                    <Button
                        className="rounded-full"
                        variant="ghost"
                    >
                        <IoMdDownload className="w-4 h-4 me-2"/>
                        Download QR Codes
                    </Button>

                </div>
            </div>

            <div className="flex gap-x-6">
                <Sidebar/>
                <div className="w-4/5 bg-gray-100 p-4 rounded-3xl">
                    View
                </div>
            </div>
        </main>


    )
};

export default AdminPage;