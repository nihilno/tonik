import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

function NotFound() {
  return (
    <section className="flex items-center gap-6 justify-center flex-col">
      <p className="text-4xl font-bold uppercase">Basic 404</p>
      <Button asChild>
        <Link href="/">
          <HomeIcon />
          Go Home
        </Link>
      </Button>
    </section>
  );
}

export default NotFound;
