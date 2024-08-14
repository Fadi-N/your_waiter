'use client'

import React from 'react';
import {Table as TableFromPrisma} from "@prisma/client";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";


interface TableListProps {
    selectedRestaurant: string;
    tables: TableFromPrisma[];
}

const TableList = ({selectedRestaurant, tables}: TableListProps) => {
    return (
        <>
            {selectedRestaurant ? (
                <>
                    {tables.length > 0 ? (
                        <Table>
                            <TableCaption>Tables for Restaurant</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Table</TableHead>
                                    <TableHead>QR code</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tables.map((table) => (
                                    <TableRow key={table.id}>
                                        <TableCell className="font-medium">{table.tableNumber}</TableCell>
                                        <TableCell>
                                            <Image
                                                src={table.qrCode}
                                                alt={`Table ${table.tableNumber}`}
                                                width={148}
                                                height={148}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No tables found for this restaurant.</p>
                    )}
                </>
            ) : (
                <p>Please select a restaurant to view its tables.</p>
            )}
        </>
    );
};

export default TableList;