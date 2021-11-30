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
    <section className="hero-details flex column align-center">
      <h2>Hero Details</h2>
      <img className="img-hero" src={`https://robohash.org/${hero.name}?size=300x300`} alt="" />
      <div className="data">
        <HeroField name="Name" value={name} />
        <HeroField name="Ability" value={ability} />
        <HeroField
          name="First train"
          value={dateStarted ? formatDistanceToNow(dateStarted, { addSuffix: true }) : 'None'}
        />
        <HeroField name="Suit" value={colors.length ? <ColorList colors={colors} /> : 'None'} />
        <HeroField name="Last power" value={trainingHistory[1]?.power || 0} />
        <HeroField name="Power" value={currentPower} />
        <HeroField name="Owner" value={(userId as any)?.username || 'None'} />
        <HeroField name="Price" value={price} />
      </div>
    </section>
  );
}

interface FieldProps {
  name: string;
  value: any;
}
function HeroField({ name, value }: FieldProps) {
  return (
    <div className="hero-field">
      <h3>{name} </h3>
      <div>{value}</div>
    </div>
  );
}
