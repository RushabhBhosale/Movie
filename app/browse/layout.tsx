// app/(auth)/layout.tsx
import React from "react";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  console.log(
    "Inside Broowse Layout - This should show for /login and /register pages"
  );

  return (
    <div>
      {/* Only rendering the main content for auth pages */}
      <main>{children}</main>
    </div>
  );
};

export default BrowseLayout;
