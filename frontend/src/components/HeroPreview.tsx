import { Hero } from '../services/hero.service';
import { ReactComponent as IconAttack } from '../assets/images/attack.svg';
import { ReactComponent as IconDefense } from '../assets/images/defense.svg';
import { ReactComponent as IconCoin } from '../assets/images/coin.svg';
import { useNavigate } from 'react-router';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { add } from 'date-fns';
import { useCheckUser } from '../hooks/useCheckUser';

interface Props {
  hero: Hero;
  type: 'Explore' | 'My Heroes';
  onTrain?: (id: string) => any;
  onBuy?: (id: string) => any;
}

export function HeroPreview({ type, hero, onTrain, onBuy }: Props) {
  const { _id, name, ability, currentPower, userId, price, trainsToday, trainingHistory } = hero;
  const currentUser = useCheckUser();
  const navigate = useNavigate();
  const isTrainingLimit = trainsToday === 5;
  const isNotEnoughMoney = currentUser && currentUser.money < hero.price;

  const handleBuy: React.MouseEventHandler = ev => {
    ev.stopPropagation();
    if (!isNotEnoughMoney) onBuy!(_id);
  };

  const handleTrain: React.MouseEventHandler = ev => {
    ev.stopPropagation();
    if (!isTrainingLimit) onTrain!(_id);
  };

  return (
    <li className="hero-preview flex column" key={_id} onClick={() => navigate(`/hero/${_id}`)}>
      <div className="flex space-between align-center">
        {ability === 'attacker' ? <IconAttack className="img-ability" /> : <IconDefense className="img-ability" />}
        <span>{name}</span>
        <span className="current-power">{currentPower}</span>
      </div>
      <img className="img-hero" src={`https://robohash.org/${name}?size=200x200`} alt="" />
      {type === 'Explore' && userId && <p className="text-center">Owned by {userId.username}</p>}
      <div className="actions">
        {!userId && onBuy && (
          <button
            className={`flex align-center justify-center ${isNotEnoughMoney ? 'disabled' : ''}`}
            onClick={handleBuy}>
            <span>Buy </span>
            <IconCoin className="icon-coin" />
            <span>{price || 'Free'}</span>
          </button>
        )}
        {onTrain && (
          <button className={isTrainingLimit ? 'disabled' : ''} onClick={handleTrain}>
            {isTrainingLimit
              ? formatDistanceToNowStrict(add(trainingHistory[4].date, { days: 1 }))
              : `Train ${trainsToday}/5`}
          </button>
        )}
      </div>
    </li>
  );
}
