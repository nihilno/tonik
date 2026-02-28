"use client";

import { useGame } from "@/hooks/use-game";
import { useNow } from "@/hooks/use-now";
import { useRound } from "@/hooks/use-round";
import { useTypingProgress } from "@/hooks/use-typing-progress";
import { useUser } from "@/hooks/use-user";
import { CheckCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Spinner from "./loader";
import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

function GameCard() {
  const { user } = useUser();
  const { gameId, getOrCreateGameWithActiveRound } = useGame(user);
  const { round } = useRound(gameId);
  const now = useNow(200);

  // podłączenie hooka do śledzenia postępu pisania
  const { input, setInput, finished } = useTypingProgress(round, user);

  // nowa runda jest tworzona, gdy aktualna się kończy
  useEffect(() => {
    if (!round || !gameId) return;
    const remainingMs = round.endsAt - now;
    if (remainingMs <= 0) {
      getOrCreateGameWithActiveRound();
    }
  }, [round, now, gameId, getOrCreateGameWithActiveRound]);

  if (!user) return null;
  if (!gameId) return <Spinner>Initializing game...</Spinner>;
  if (!round) return <Spinner>Waiting for next round...</Spinner>;

  // kalulowanie pozostałego czasu
  const remainingMs = round.endsAt - now;
  const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

  // wyłączamy input, jeśli runda się skończyła lub gracz już ukończył pisanie
  const isDisabled = finished || remainingSeconds <= 0;

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
        {finished ? (
          <span className="h-16  w-full">
            <CheckCircle className="size-full" />
          </span>
        ) : (
          <Input
            key={round.roundId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isDisabled}
            placeholder="Zacznij pisać..."
            className="h-16 text-2xl! rounded-full text-center"
            autoFocus
          />
        )}
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
