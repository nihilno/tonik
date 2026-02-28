"use client";

import { useGame } from "@/hooks/use-game";
import { useNow } from "@/hooks/use-now";
import { useRound } from "@/hooks/use-round";
import { useUser } from "@/hooks/use-user";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Spinner from "./loader";
import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

function GameCard() {
  const { user } = useUser();
  const { gameId } = useGame(user);
  const { round } = useRound(gameId);
  const now = useNow(200);

  if (!user) return null;
  if (!gameId) return <Spinner>Initializing game...</Spinner>;
  if (!round) return <Spinner>Waiting for next round...</Spinner>;

  // kalulowanie pozostałego czasu
  const remainingMs = round.endsAt - now;
  const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

  return (
    <CardContent>
      <section className="flex items-center text-center flex-col ">
        <p className="text-lg text-muted-foreground">
          Time left: {remainingSeconds}s
        </p>
        <h1 className="select-none font-light text-3xl max-w-[30ch] mt-8">
          {round.sentence}
        </h1>
        <Separator className="my-8" />
        <Input
          key={round.roundId}
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
  );
}

export default GameCard;
