import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import Providers from "@/components/core/Providers";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import React from "react";
import SignOutButton from "@/components/auth/SignOutButton";
import { auth } from "@/lib/auth";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SignOutButton />
          {session?.accessToken ?? "NONE"}
          {children}
        </Providers>
      </body>
    </html>
  );
}
