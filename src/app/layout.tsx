import Providers from "@/components/providers";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Tonik Recruitment Task",
    default: "Tonik Recruitment Task",
  },
  description:
    "Typeracer clone built with Next.js and TypeScript and Convex as a backend. This project is a recruitment task for Tonik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "antialiased grid place-items-center min-h-dvh px-2 translate-y-32",
        )}
      >
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
