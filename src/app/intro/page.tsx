import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction",
};

export default function IntroPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-light">
          <h1 className="text-xl">Welcome, Maciej</h1>
          <CardDescription>Get ready for the game.</CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent className=" space-y-3">
        <Button type="submit" size="lg" className="w-full text-lg">
          Start Game <CircleCheck className="size-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
