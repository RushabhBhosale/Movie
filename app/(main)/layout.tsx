"use client";

import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <main className="w-full">
      <div className="mb-[64px]">
        <Navbar onSidebarToggle={() => setSidebarOpen((prev) => !prev)} />
      </div>
      <div className="bg-muted_background w-full min-h-[90.5vh]">
        <div className="flex">
          <div className="lg:w-[12%] fixed z-10 w-[180px]">
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
          <div
            className={cn(
              "w-[100%] p-5 transition-all",
              isSidebarOpen ? "lg:w-[88%]" : "lg:w-[100%]",
              isSidebarOpen ? "lg:ml-[172px]" : ""
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
