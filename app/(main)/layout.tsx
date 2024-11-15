import type { Metadata } from "next";

// Google Fonts (Cinematic and Modern)
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/app-navbar";

export const metadata: Metadata = {
  title: "Movie Website",
  description: "Explore the best movies online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        <div>{children} </div>
      </main>
    </SidebarProvider>
  );
}
