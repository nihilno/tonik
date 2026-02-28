import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function JoinPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="font-medium text-xl">Tonik | Typing game</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-8">
        <form className="flex flex-col items-center gap-4">
          <Label className="text-muted-foreground self-baseline" htmlFor="name">
            Provide your name
          </Label>
          <Input
            id="name"
            name="name"
            autoComplete="given-name"
            autoFocus
            required
            placeholder="Maciej"
            maxLength={12}
          />
          <Button type="button" asChild size="lg" className="w-full text-lg">
            <Link href="/intro">
              Join <CirclePlus className="size-5" />
            </Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
