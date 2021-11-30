import { Hero } from '../services/hero.service';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { ColorList } from './ColorList';

interface Props {
  hero: Hero;
}

export function HeroDetails({ hero }: Props) {
  const { name, ability, colors = [], currentPower, trainingHistory, userId, price } = hero;
  const dateStarted = trainingHistory.length && trainingHistory[trainingHistory.length - 1].date;
  return (
    <section className="hero-details flex align-center">
      <div>
        <h2>Hero Details</h2>
        <HeroField name="Name" value={name} />
        <HeroField name="Ability" value={ability} />
        <HeroField
          name="Started training at"
          value={dateStarted ? formatDistanceToNow(dateStarted, { addSuffix: true }) : 'None'}
        />
        <HeroField name="Suit colors" value={colors.length ? <ColorList colors={colors} /> : 'None'} />
        <HeroField name="Previous power" value={trainingHistory[1]?.power || 0} />
        <HeroField name="Current power" value={currentPower} />
        <HeroField name="Owner" value={(userId as any)?.username || 'None'} />
        <HeroField name="Price" value={price} />
      </div>
      <img className="img-hero" src={`https://robohash.org/${hero.name}?size=300x300`} alt="" />
    </section>
  );
}

interface FieldProps {
  name: string;
  value: any;
}
function HeroField({ name, value }: FieldProps) {
  return (
    <div>
      <span>{name}: </span>
      <span>{value}</span>
    </div>
  );
}
