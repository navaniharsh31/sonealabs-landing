type Props = { text: string };

export default function SplitChars({ text }: Props) {
  return (
    <>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className="space" />
        ) : (
          <span key={i} className="char">
            {ch}
          </span>
        )
      )}
    </>
  );
}
