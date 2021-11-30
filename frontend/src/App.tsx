import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { MyHeroesPage } from './pages/MyHeroesPage';
import { AuthPage } from './pages/AuthPage';
import { RootState } from './store/store';
import { useEffect } from 'react';
import { getCurrentUser } from './store/user.actions';
import { ExplorePage } from './pages/ExplorePage';
import { AddPage } from './pages/AddPage';
import { HeroPage } from './pages/HeroPage';
import { Alert, Snackbar } from '@mui/material';
import { setAlert } from './store/system.actions';

export function App() {
  const user = useSelector((state: RootState) => state.userModule.user);
  const alert = useSelector((state: RootState) => state.systemModule.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        await dispatch(getCurrentUser());
      } catch (err) {
        setAlert({ message: 'Sorry, an error occured', type: 'error' });
      }
    };
    getUser();
  }, [dispatch]);

  const handleCloseAlert = () => {
    dispatch(setAlert(null));
  };

  return (
    <div className="app main-layout">
      <AppHeader user={user} />
      {!user && <AuthPage />}
      {user && (
        <Routes>
          <Route path="/" element={<MyHeroesPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/hero/:id" element={<HeroPage />} />
          <Route path="*" element={<MyHeroesPage />} />
        </Routes>
      )}
      <AppFooter />
      {alert && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open
          autoHideDuration={6000}
          onClose={handleCloseAlert}>
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Snackbar>
      )}
    </div>
  );
}
