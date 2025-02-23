import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ApolloWrapper from '@/components/ApolloWrapper';
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Energy Consumption Tracker",
    template: "%s | Energy Consumption Tracker",
  },
  description: "Track your energy consumption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloWrapper>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}
