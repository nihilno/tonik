export function renderTypingProgress(sentence: string, input: string) {
  return sentence.split("").map((char, i) => {
    const typedChar = input[i];

    let className = "";
    if (typedChar == null) className = "text-foreground";
    else if (typedChar === char) className = "text-green-700 font-semibold";
    else className = "text-red-700 font-semibold";

    return (
      <span key={i} className={className}>
        {char}
      </span>
    );
  });
}
