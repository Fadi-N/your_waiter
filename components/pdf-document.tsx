'use client';

import React from 'react';
import { Table as TableFromPrisma } from "@prisma/client";
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface TableListProps {
    selectedRestaurant: string;
    tables: TableFromPrisma[];
}

// Style for the PDF document
const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    tableHeader: { fontWeight: 'bold', marginBottom: 5 },
    tableRow: { display: 'flex', flexDirection: 'row', marginBottom: 5 },
    tableCell: { width: '50%' },
    image: { width: 50, height: 50 },
});

const PdfDocument = ({ tables }: { tables: TableFromPrisma[] }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.tableHeader}>Table List</Text>
            {tables.map((table) => (
                <View key={table.id} style={styles.tableRow}>
                    <Text style={styles.tableCell}>Table {table.tableNumber}</Text>
                    {/* Adding Image for each table */}
                    <Image
                        style={styles.image}
                        src={table.qrCode}
                    />
                </View>
            ))}
        </Page>
    </Document>
);

export default PdfDocument