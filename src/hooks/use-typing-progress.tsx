import { Round, User } from "@/types";
import { useMutation } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../convex/_generated/api";

// dla siebie: można to ulepszyć, ale czas goni.

export function useTypingProgress(round: Round | null, user: User | null) {
  const [input, setInput] = useState("");
  const [finished, setFinished] = useState(false);
  const submittedRef = useRef(false);
  const prevInputRef = useRef("");

  const updateProgress = useMutation(api.functions.progress.updateProgress);
  const submitResult = useMutation(api.functions.progress.submitResult);

  // resetujemy stan przy zmianie rundy
  useEffect(() => {
    if (!round) return;
    setInput("");
    setFinished(false);
    submittedRef.current = false;
  }, [round]);

  // live progress
  // wysyłamy update tylko przy zmianie słowa, zamiast przy każdym wpisanym znaku, aby poprawić wydajność
  useEffect(() => {
    if (!round || !user) return;
    if (finished) return;

    const prev = prevInputRef.current;
    const curr = input;

    const wordChanged =
      curr.endsWith(" ") || // zakończono słowo
      prev.endsWith(" ") !== curr.endsWith(" ") || // zmiana struktury słów
      curr.split(" ").length !== prev.split(" ").length; // liczba słów się zmieniła

    if (!wordChanged) {
      prevInputRef.current = curr;
      return;
    }

    prevInputRef.current = curr;

    updateProgress({
      roundId: round.roundId,
      userId: user.userId,
      typedText: curr,
    });
  }, [input, round, user, finished, updateProgress]);

  useEffect(() => {
    if (!round || !user) return;
    if (submittedRef.current) return;

    if (input === round.sentence) {
      submittedRef.current = true;
      setFinished(true);

      submitResult({
        roundId: round.roundId,
        userId: user.userId,
        typedText: input,
        finishedAt: Date.now(),
      });
    }
  }, [input, round, user, submitResult]);

  return { input, setInput, finished };
}
