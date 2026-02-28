import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Game",
};

export default function GamePage() {
  return (
    <section className="space-y-8">
      <Card>
        <CardContent>
          <section className="flex items-center text-center flex-col ">
            <p className="text-lg text-muted-foreground">Time left: Xs</p>
            <h1 className="select-none font-light text-3xl max-w-[30ch] mt-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              perspiciatis.
            </h1>
            <Separator className="my-8" />
            <Input
              placeholder="Zacznij pisać..."
              className="h-16 text-2xl! rounded-full text-center"
              autoFocus
            />
            <Separator className="my-8" />
          </section>
          <Button type="button" asChild size="lg" className="w-full text-lg">
            <Link href="/intro">
              <ChevronLeft className="size-5" />
              End Game
            </Link>
          </Button>
        </CardContent>
      </Card>

      <p>Table will be here</p>
    </section>
  );
}
