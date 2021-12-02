import Slider from '@mui/material/Slider';
import { Filter } from '../pages/ExplorePage';

interface ButtonProps {
  children: string;
  fieldName: keyof Filter;
  value: string;
}

interface Props {
  filter: Filter;
  maxPower: number;
  onFilter: (fieldName: ButtonProps['fieldName'], value: any) => void;
}

export function HeroFilter({ filter, maxPower, onFilter }: Props) {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onFilter('minPower', newValue[0]);
      onFilter('maxPower', newValue[1]);
    } else {
      onFilter('minPower', newValue);
      onFilter('maxPower', newValue);
    }
  };

  const FilterButton = ({ fieldName, value, children }: ButtonProps) => {
    const isSelected = filter[fieldName] === value;
    const addToFilter = () => onFilter(fieldName, value);
    const removeFromFilter = () => onFilter(fieldName, undefined);
    return (
      <button
        className={`${isSelected ? 'selected' : ''} btn-trans`}
        onClick={() => (isSelected ? removeFromFilter() : addToFilter())}>
        {children}
      </button>
    );
  };

  return (
    <section className="hero-filter flex align-center space-between">
      <div className="flex">
        <FilterButton fieldName="userId" value="none">
          For sale
        </FilterButton>
        <FilterButton fieldName="ability" value="defender">
          Defender
        </FilterButton>
        <FilterButton fieldName="ability" value="attacker">
          Attacker
        </FilterButton>
      </div>
      <div className="flex align-center slider">
        <span className="info">Power:</span>
        <Slider
          min={0}
          max={maxPower}
          step={100}
          value={[filter.minPower, filter.maxPower]}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
        />
      </div>
    </section>
  );
}
