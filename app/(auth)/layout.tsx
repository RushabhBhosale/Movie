// app/(auth)/layout.tsx
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  console.log(
    "Inside Auth Layout - This should show for /login and /register pages"
  );

  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center bg-muted-foreground">
      <BackgroundBeams className="absolute inset-0 " />
      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default AuthLayout;
