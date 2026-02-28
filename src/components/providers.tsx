import { ConvexClientProvider } from "./convex-client-provider";
import { Toaster } from "./ui/sonner";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      {children}
      <Toaster />
    </ConvexClientProvider>
  );
}

export default Providers;
