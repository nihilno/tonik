import { Loader } from "lucide-react";

function Spinner({ children }: { children?: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center gap-4">
      <Loader className="animate-spin size-8" />
      {children}
    </section>
  );
}

export default Spinner;
