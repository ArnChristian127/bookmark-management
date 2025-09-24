import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookmark Management - Authentication",
  description: "Bookmark Management",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-white text-sm sm:text-base md:text-lg xl:text-xl text-gray-700">
      <body>
        {children}
      </body>
    </html>
  );
}