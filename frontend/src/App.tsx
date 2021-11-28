import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { HeroesPage } from './pages/HeroesPage';
import { AuthPage } from './pages/AuthPage';
import { RootState } from './store/store';
import { useEffect } from 'react';
import { getCurrentUser } from './store/user.actions';
import { ExplorePage } from './pages/ExplorePage';
import { AddPage } from './pages/AddPage';
import { HeroPage } from './pages/HeroPage';

export function App() {
  const user = useSelector((state: RootState) => state.userModule.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="app main-layout">
      <AppHeader user={user} />
      {!user && <AuthPage />}
      {user && (
        <Routes>
          <Route path="/" element={<HeroesPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      )}
      <AppFooter />
    </div>
  );
}
