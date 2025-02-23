import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Notifications} from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import {ColorSchemeScript, createTheme, MantineColorsTuple, mantineHtmlProps, MantineProvider,} from "@mantine/core";
import React from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tushirikiane",
    description:
        "Tushirikiane is an open source project management software that aims to provide mid-sized organizations and teams with a tool they can use to manage their projects",
};

const skyBlue: MantineColorsTuple = [
    '#e1f8ff',
    '#cbedff',
    '#9ad7ff',
    '#64c1ff',
    '#3aaefe',
    '#20a2fe',
    '#099cff',
    '#0088e4',
    '#0079cd',
    '#0068b6'
];

const theme = createTheme({
    colors: {
        skyBlue,
    }
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" {...mantineHtmlProps}>
        <head>
            <ColorSchemeScript/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <MantineProvider theme={theme}>
            <Notifications/>
            {children}
        </MantineProvider>
        </body>
        </html>
    );
}
