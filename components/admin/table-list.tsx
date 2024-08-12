'use client'

import React from 'react';
import {Table} from "@prisma/client";


interface TableListProps {
    selectedRestaurant: string;
    tables: Table[];
}
const TableList = ({selectedRestaurant, tables} : TableListProps) => {
    return (
        <>
            {selectedRestaurant ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Tables for Restaurant</h2>
                    {tables.length > 0 ? (
                        <ul>
                            {tables.map((table) => (
                                <>
                                    <li key={table.id} className="mb-2">
                                        Table {table.tableNumber}
                                    </li>
                                    <img src={table.qrCode} alt=""/>
                                </>


                            ))}
                        </ul>
                    ) : (
                        <p>No tables found for this restaurant.</p>
                    )}
                </div>
            ) : (
                <p>Please select a restaurant to view its tables.</p>
            )}
        </>
    );
};

export default TableList;