"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCheckStorage } from "@/hooks/use-check-storage";
import { useUser } from "@/hooks/use-user";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

function IntroCard() {
  const { user } = useUser();
  useCheckStorage();

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="font-light">
          <h1 className="text-xl">Welcome, {user?.name ?? "Guest"}</h1>
        </CardTitle>
        <CardDescription>Get ready for the game.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 ">
        <Button type="button" asChild size="lg" className="w-full text-lg">
          <Link href="/game">
            Start Game <ChevronRight className="size-5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default IntroCard;
