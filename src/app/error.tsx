"use client";

import { Button } from "@/components/ui/button";
import { Home, RotateCw } from "lucide-react";
import Link from "next/link";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex flex-col items-center justify-center text-center">
      <h2 className="mb-2 text-2xl font-semibold">Something went wrong.</h2>
      <p className="mt-4 max-w-md text-sm opacity-60">
        {error.message ||
          "An error occured, but don't worry — we'll get you back."}
      </p>
      <div className="mt-6 space-x-2">
        <Button onClick={reset} variant="outline" size={"sm"}>
          <RotateCw /> <span>Reload</span>
        </Button>
        <Link href="/">
          <Button size={"sm"} variant={"secondary"}>
            <Home /> <span>Go Home</span>
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xs opacity-75">
        Error ID: {error.digest || "Not known yet."}
      </p>
    </section>
  );
}

export default Error;
