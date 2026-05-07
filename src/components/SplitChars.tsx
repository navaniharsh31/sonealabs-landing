type Props = { text: string };

export default function SplitChars({ text }: Props) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="word" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((ch, charIndex) => (
            <span key={charIndex} className="char">
              {ch}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span className="space">&nbsp;</span>}
        </span>
      ))}
    </>
  );
}
