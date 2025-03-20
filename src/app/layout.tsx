import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DashboardProvider } from "./context/DashboardContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Growth Dashboard",
  description: "Track marketing performance metrics against monthly goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-100`} style={{ backgroundColor: '#f3f4f6' }} suppressHydrationWarning>
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </body>
    </html>
  );
}
