"use client";

import { useCheckStorage } from "@/hooks/use-check-storage";
import { useMutation } from "convex/react";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function NameForm() {
  const [name, setName] = useState("");
  const { replace } = useRouter();
  const getOrCreateUser = useMutation(api.functions.users.getOrCreateUser);

  useCheckStorage();

  // dodawanie użytkownika
  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const nameTrimmed = name.trim();
    if (!nameTrimmed) {
      toast.error("Name cannot be empty", { position: "bottom-center" });
      return;
    }

    const userId = await getOrCreateUser({ name: nameTrimmed });
    localStorage.setItem("name", JSON.stringify({ name: nameTrimmed, userId }));
    replace("/intro");

    toast.success(
      `Welcome, ${nameTrimmed}. Your name has been successfully submitted.`,
      { position: "bottom-center" },
    );
  }

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
      <Label className="text-muted-foreground self-baseline" htmlFor="name">
        Provide your name
      </Label>
      <Input
        id="name"
        name="name"
        autoComplete="given-name"
        autoFocus
        required
        placeholder="Maciej"
        maxLength={12}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" size="lg" className="w-full text-lg">
        Join <CirclePlus className="size-5" />
      </Button>
    </form>
  );
}

export default NameForm;
