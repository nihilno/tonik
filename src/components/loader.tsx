import { Loader } from "lucide-react";
import React from "react";

function Spinner({ children }: { children?: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center gap-4 opacity-75">
      <Loader className="animate-spin size-6" />
      <span className="text-sm">{children}</span>
    </section>
  );
}

export default Spinner;
