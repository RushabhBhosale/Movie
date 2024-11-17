import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="w-full">
      <Navbar />
      <div className="bg-muted_background w-full min-h-[90.5vh]">
        <div className="flex">
          <div className="w-[12%]">
            <Sidebar />
          </div>
          <div className="w-[88%] p-5">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
