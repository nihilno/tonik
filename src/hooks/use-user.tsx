"use client";

import { User } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useUser() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("name");
    if (!stored) {
      router.replace("/");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    } catch {
      router.replace("/");
    }
  }, [router]);

  return { user };
}
