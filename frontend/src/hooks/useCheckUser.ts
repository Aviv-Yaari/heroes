import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { User } from '../store/user.reducer';

export function useCheckUser(): User | undefined {
  const user = useSelector((state: RootState) => state.userModule.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log('No user, redirecting to login');
      navigate('/login');
    }
  }, [navigate, user]);
  return user;
}
