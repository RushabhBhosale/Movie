"use client";

import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <main className="w-full relative">
      <div className={cn("mb-[70px]", isSidebarOpen && "blur-md")}>
        <Navbar onSidebarToggle={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className="bg-back w-full">
        <div className="flex">
          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className={cn("lg:w-[12%] fixed z-10 w-[180px]")}
          >
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Main content */}
          <div
            className={cn(
              "w-[100%] transition-all",
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
