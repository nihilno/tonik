import GameCard from "@/components/game-card";
import { Card } from "@/components/ui/card";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game",
};

export default function GamePage() {
  return (
    <section className="space-y-8">
      <Card>
        <GameCard />
      </Card>

      <p>Table will be here</p>
    </section>
  );
}
