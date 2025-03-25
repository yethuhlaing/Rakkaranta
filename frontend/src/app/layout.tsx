import "@/styles/globals.css";

import { fontGeist, fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { ThemeProvider } from "next-themes";

import NextAuthProvider from "@/lib/provider";
import { cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

interface RootLayoutProps {
    children: React.ReactNode;
}

export const metadata = constructMetadata();

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                    fontUrban.variable,
                    fontHeading.variable,
                    fontGeist.variable,
                )}
            >
                <NextAuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster richColors closeButton />
                    </ThemeProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
