"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// jeżeli użytkownik jest w localstorage, to od razu go przeniesiemy
export function useCheckStorage() {
  const { replace } = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("name");
    if (stored) replace("/intro");
    else replace("/");
  }, [replace]);
}
