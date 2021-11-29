import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Hero } from '../services/hero.service';
import { ReactComponent as IconAttack } from '../assets/images/attack.svg';
import { ReactComponent as IconDefense } from '../assets/images/defense.svg';
import { ReactComponent as IconCoin } from '../assets/images/coin.svg';
import { useNavigate } from 'react-router';

interface Props {
  hero: Hero;
  type: 'Explore' | 'My Heroes';
  onTrain?: Function; // TODO - be more specific
  onBuy?: Function; // TODO - be more specific
}

export function HeroPreview({ type, hero, onTrain, onBuy }: Props) {
  const { _id, name, ability, currentPower, userId, price, trainsToday } = hero;
  const currentUser = useSelector((state: RootState) => state.userModule.user);
  const navigate = useNavigate();

  const handleBuy: React.MouseEventHandler = ev => {
    ev.stopPropagation();
    onBuy!(_id);
  };

  const handleTrain: React.MouseEventHandler = ev => {
    ev.stopPropagation();
    onTrain!(_id);
  };

  return (
    <li className="hero-preview flex column" key={_id} onClick={() => navigate(`/hero/${_id}`)}>
      <div className="flex space-between">
        {ability === 'attacker' ? <IconAttack className="img-ability" /> : <IconDefense className="img-ability" />}
        <span>{name}</span>
        <span className="fw-700">{currentPower}</span>
      </div>
      <img className="img-hero" src={`https://robohash.org/${name}?size=200x200`} alt="" />
      {userId && <p className="text-center">Owned by {userId.username}</p>}
      <div className="actions">
        {!userId && onBuy && (
          <button
            className={`flex align-center justify-center ${currentUser.money < hero.price ? 'disabled' : ''}`}
            onClick={handleBuy}>
            <span>Buy </span>
            <IconCoin className="icon-coin" />
            <span>{price || 'Free'}</span>
          </button>
        )}
        {onTrain && (
          <button className={trainsToday === 5 ? 'disabled' : ''} onClick={handleTrain}>
            Train {trainsToday}/5
          </button>
        )}
      </div>
    </li>
  );
}
