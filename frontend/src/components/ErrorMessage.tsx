interface Props {
  message: string;
}

export function ErrorMessage({ message }: Props) {
  const lines = message.split("<br>");
  return (
    <section className="error-message">
      {lines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </section>
  );
}
