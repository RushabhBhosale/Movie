import type { Metadata } from "next";
import localFont from "next/font/local";

// Google Fonts (Cinematic and Modern)
import { Poppins, Cinzel } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/app-navbar";
import "./globals.css";

// Custom local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Load Poppins and Cinzel fonts
const poppins = Poppins({
  weight: ["400", "700"], // Use light and bold weights
  subsets: ["latin"],
  variable: "--font-poppins",
});

const cinzel = Cinzel({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Movie Website",
  description: "Explore the best movies online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Inside Root Layout - This should show for non-auth pages");
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Cinzel:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${cinzel.variable} antialiased`}
      >
        <main className="w-full">
          <div>{children} </div>
        </main>
      </body>
    </html>
  );
}
