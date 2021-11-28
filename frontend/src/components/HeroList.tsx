import { Hero } from '../store/user.reducer';
import { HeroPreview } from './HeroPreview';

interface Props {
  heroes: Hero[];
  onTrain: Function;
}

export function HeroList({ heroes, onTrain }: Props) {
  return (
    <ul className="hero-list">
      {heroes.map(hero => (
        <HeroPreview key={hero._id} hero={hero} onTrain={onTrain} />
      ))}
    </ul>
  );
}
