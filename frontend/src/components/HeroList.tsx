import { Hero } from '../services/hero.service';
import { HeroPreview } from './HeroPreview';

interface Props {
  heroes: Hero[];
  onTrain?: Function;
  onBuy?: Function;
  type: 'Explore' | 'My Heroes';
}

export function HeroList({ heroes, type, onTrain, onBuy }: Props) {
  return (
    <ul className="hero-list">
      {heroes.map(hero => (
        <HeroPreview key={hero._id} hero={hero} type={type} onTrain={onTrain} onBuy={onBuy} />
      ))}
    </ul>
  );
}
