import GameCard from "@/components/game-card";
import { Card } from "@/components/ui/card";

import TableWrapper from "@/components/table/data-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game",
};

export default function GamePage() {
  return (
    <section className="space-y-8">
      <Card className="min-w-2xl! min-h-100 grid place-items-center">
        <GameCard />
      </Card>
      <TableWrapper />
    </section>
  );
}
