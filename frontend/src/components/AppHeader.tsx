import { NavLink } from 'react-router-dom';
import { User } from '../store/user.reducer';
import { ReactComponent as IconCoin } from '../assets/images/coin.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../store/user.actions';

interface Props {
  user: User;
}
export function AppHeader({ user }: Props) {
  const dispatch = useDispatch();
  return (
    <header className="flex space-between app-header">
      <div className="flex">
        <h1>Heroes</h1>
        {user && <NavLink to="/">My Heroes</NavLink>}
        <NavLink to="/explore">Explore</NavLink>
      </div>
      <div className="flex">
        {!user && <NavLink to="/login">Login</NavLink>}
        {user && (
          <>
            <div className="flex align-center">
              <IconCoin className="icon-coin" />
              <span>{user.money}</span>
            </div>
            <span>{user.username}</span>
            <button className="btn-link" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
