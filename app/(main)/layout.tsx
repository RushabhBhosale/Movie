"use client";

import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  return (
    <main className="w-full relative">
      <div className={cn("mb-[64px]", isSidebarOpen && "blur-md")}>
        <Navbar onSidebarToggle={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className="bg-back w-full">
        <div className="flex">
          {/* Sidebar */}
          <div className={cn("lg:w-[12%] fixed z-10 w-[180px]")}>
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Main content */}
          <div
            className={cn(
              "w-[100%] p-5 transition-all",
              isSidebarOpen && "blur-md"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
