import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { MyHeroes } from './pages/MyHeroes';
import { LoginSignup } from './pages/LoginSignup';
import { RootState } from './store/store';
import { useEffect } from 'react';
import { getCurrentUser } from './store/user.actions';

export function App() {
  const user = useSelector((state: RootState) => state.userModule.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="app main-layout">
      <AppHeader />
      {!user && <LoginSignup />}
      {user && (
        <Routes>
          <Route path="/" element={<MyHeroes />} />
        </Routes>
      )}
      <AppFooter />
    </div>
  );
}
