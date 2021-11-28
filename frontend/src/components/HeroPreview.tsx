import { formatDistanceToNow } from 'date-fns';
import { useMemo } from 'react';
import { Hero } from '../store/user.reducer';

interface Props {
  hero: Hero;
  onTrain: Function; // TODO - be more specific
}

export function HeroPreview({ hero, onTrain }: Props) {
  const { _id, name, ability, currentPower, trainingHistory } = hero;
  const dateStarted = +Object.keys(trainingHistory[trainingHistory.length - 1])[0];

  return (
    <li className="hero" key={_id}>
      <h3>{name}</h3>
      <p>{ability}</p>
      <p>Started training {formatDistanceToNow(dateStarted, { addSuffix: true })}</p>
      <p>Power from last training: {Object.values(trainingHistory[1])[0]}</p>
      <p>Power:{currentPower}</p>
      <button onClick={() => onTrain(_id)}>Train</button>
    </li>
  );
}
