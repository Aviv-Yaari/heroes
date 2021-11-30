type Props = {
  errors: string[];
  [key: string]: any;
};

export function FormField(props: Props) {
  return (
    <div className="full-width">
      <input className={`${props.className || ''} ${props.errors.length ? 'invalid' : ''}`} {...props} />
      {props.errors.map((error, idx) => (
        <p key={idx}>{error}</p>
      ))}
    </div>
  );
}
