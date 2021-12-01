import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { User } from '../store/user.reducer';

export function useGetUser(): User | undefined {
  const user = useSelector((state: RootState) => state.userModule.user);
  return user;
}
