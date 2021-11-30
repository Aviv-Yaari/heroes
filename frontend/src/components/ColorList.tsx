interface Props {
  selectedColors?: Set<string>;
  colors: string[];
  onClick?: Function;
}
export function ColorList({ selectedColors, colors, onClick }: Props) {
  const handleClick = (isSelected: boolean, color: string) => {
    if (!selectedColors || !onClick) return;
    isSelected ? selectedColors.delete(color) : selectedColors.add(color);
    onClick(new Set(selectedColors));
  };

  return (
    <section className="flex wrap color-list">
      {colors.map(color => {
        const isSelected = selectedColors?.has(color) || false;
        return (
          <span
            key={color}
            className={`color ${isSelected ? 'selected' : ''}`}
            style={{ color, cursor: onClick ? 'pointer' : 'default' }}
            onClick={() => handleClick(isSelected, color)}>
            {color}
          </span>
        );
      })}
    </section>
  );
}
