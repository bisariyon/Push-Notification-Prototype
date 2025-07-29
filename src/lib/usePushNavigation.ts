'use client';

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const usePushNavigation = () => {
  const router = useRouter();
  const hasNavigated = useRef(false);

  useEffect(() => {
    const handleNavigation = (e: any) => {
      if (hasNavigated.current) return;

      const target = e.detail?.target ?? "dashboard";
      console.log("🚀 Navigating from push event to:", target);
      hasNavigated.current = true;
      router.push(`/${target}`);
    };

    window.addEventListener("notification-navigate", handleNavigation);

    const pending = localStorage.getItem("pendingTarget");
    if (pending && !hasNavigated.current) {
      console.log("🧠 Navigating to previously stored target:", pending);
      hasNavigated.current = true;
      router.push(`/${pending}`);
      localStorage.removeItem("pendingTarget");
    }

    return () => {
      window.removeEventListener("notification-navigate", handleNavigation);
    };
  }, [router]);
};

