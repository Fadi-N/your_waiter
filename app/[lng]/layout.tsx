import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";
import { dir } from 'i18next';
import {languages} from "@/app/i18n/settings";

const inter = Inter({subsets: ["latin"]});

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }))
}

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

interface RootLayoutProps {
    children: React.ReactNode;
    params: { lng: string };
}

export default async function RootLayout({ children, params: {lng} }: RootLayoutProps) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <html lang={lng} dir={dir(lng)}>
            <body className={inter.className}>
            <div className="flex flex-col h-screen overflow-y-hidden">
                {children}
            </div>
            </body>
            </html>
        </SessionProvider>
    );
}