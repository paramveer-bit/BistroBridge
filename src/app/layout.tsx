import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster";
import AuthWrapper from "@/components/AuthWrapper";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <SessionProvider>
            <AuthWrapper>
              {children}
              <Toaster />
            </AuthWrapper>
          </SessionProvider>
        </body>
        
      
    </html>
  );
}
