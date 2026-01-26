import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "CanvaPro Store",
    description: "Get Canva Pro for cheap",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="/css/vendor.css" />
                <link rel="stylesheet" href="/css/main.css" />
                <link rel="stylesheet" href="/css/main.3c8c0780.css" />
                <link rel="stylesheet" href="/css/main.3dd.css" />
            </head>
            <body className={inter.className}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
