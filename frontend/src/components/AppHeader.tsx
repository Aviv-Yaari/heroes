import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { NavLink } from 'react-router-dom';
import { User } from '../store/user.reducer';
import { ReactComponent as IconCoin } from '../assets/images/coin.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../store/user.actions';
import { useState } from 'react';

interface Props {
  user: User;
}
export function AppHeader({ user }: Props) {
  const [isMenu, setIsMenu] = useState(false);
  const handleToggleMenu = () => {
    setIsMenu(isMenu => !isMenu);
  };
  return (
    <header className="flex space-between app-header">
      <div className="flex align-center">
        <h1>
          <NavLink to="/">Heroes</NavLink>
        </h1>
        {user && <NavLink to="/explore">Explore</NavLink>}
      </div>
      {user && (
        <section className="flex username" onClick={handleToggleMenu}>
          <div className="flex align-center user-money">
            <IconCoin className="icon-coin" />
            <span>{user.money}</span>
          </div>
          <div className="flex align-center">
            <span>{user.username}</span>
            <KeyboardArrowDownIcon />
          </div>
        </section>
      )}
      {isMenu && <UserMenu user={user} onClose={handleToggleMenu} />}
    </header>
  );
}

interface MenuProps extends Props {
  onClose: React.MouseEventHandler;
}
function UserMenu({ user, onClose }: MenuProps) {
  const dispatch = useDispatch();
  return (
    <div className="overlay" onClick={onClose}>
      <section className="user-menu">
        <div className="money">
          <IconCoin className="icon-coin" />
          <span>{user.money}</span>
        </div>
        <button className="full-width btn-link" onClick={async () => await dispatch(logout())}>
          Logout
        </button>
      </section>
    </div>
  );
}
