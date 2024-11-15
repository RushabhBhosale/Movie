// app/(auth)/layout.tsx
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center bg-foreground">
      <main className="w-full">{children}</main>
    </div>
  );
};

export default AuthLayout;
