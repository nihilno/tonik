import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Introduction",
};

export default function IntroPage() {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="font-light">
          <h1 className="text-xl">Welcome, Maciej</h1>
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
