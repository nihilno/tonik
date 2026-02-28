"use client";

import { useGame } from "@/hooks/use-game";
import { useParticipants } from "@/hooks/use-participants";
import { useRound } from "@/hooks/use-round";
import { useUser } from "@/hooks/use-user";
import { columns } from "./columns";
import DataTable from "./data-table";

function TableWrapper() {
  const { user } = useUser();
  const { gameId } = useGame(user);
  const { round } = useRound(gameId);
  const participants = useParticipants(round?.roundId ?? null);

  return <DataTable participants={participants} columns={columns} />;
}

export default TableWrapper;
