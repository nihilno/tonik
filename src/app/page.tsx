import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";

export default function JoinPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold text-xl">Tonik | Typing game</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-8">
        <form className="flex flex-col items-center gap-4">
          <Label className="text-muted-foreground">Provide your name</Label>
          <Input
            autoFocus
            required
            placeholder="Maciej"
            autoComplete="given-name"
          />
          <Button type="submit" size="lg" className="w-full text-lg">
            Start <ChevronRight className="size-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
