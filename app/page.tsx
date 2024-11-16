"use client";

import { isAuthenticated } from "@/utils/isAuthenticated";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const App = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuth = isAuthenticated();
    if (isAuth) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
};

export default App;
