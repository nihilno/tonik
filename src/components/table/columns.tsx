import { Participant } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

export const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0!"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "typedText",
    header: "Progress",
    meta: { className: "w-[400px]" },
    cell: ({ row }) => {
      const typedText = row.original.typedText;
      const visible =
        typedText.length > 40 ? "…" + typedText.slice(-40) : typedText;
      return <span className="font-mono block"> {visible} </span>;
    },
  },
  {
    accessorKey: "wpm",
    header: "WPM",
    cell: ({ row }) => {
      const wpm = row.original.wpm;
      return wpm ? wpm.toFixed(1) : "0.0";
    },
  },
  {
    accessorKey: "accuracy",
    header: "Accuracy",
    cell: ({ row }) => {
      const accuracy = row.original.accuracy;
      return accuracy ? Math.round(accuracy * 100) + "%" : "0%";
    },
  },
];
