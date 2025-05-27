import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import { ToastProvider } from "../components/ui/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MPEC Proof Reasoning Tool",
  description: "Mathematical Proof Explanatory Chain",
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
        style={{
          padding: "1rem",
          paddingBlock: "1rem",
          paddingInline: "0.5rem",
        }}
      >
        <StoreProvider>
          <div className="min-h-screen flex flex-col">
            <div className="container mx-auto px-4">
              {children}
            </div>
            <ToastProvider />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
