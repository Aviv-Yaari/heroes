import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { MyHeroesPage } from './pages/MyHeroesPage';
import { AuthPage } from './pages/AuthPage';
import { RootState } from './store/store';
import { ExplorePage } from './pages/ExplorePage';
import { AddPage } from './pages/AddPage';
import { HeroPage } from './pages/HeroPage';
import { Alert, Snackbar } from '@mui/material';
import { setAlert } from './store/system.actions';
import { useGetUser } from './hooks/useGetUser';
import { useEffect } from 'react';
import { reloadUser } from './store/user.actions';

export function App() {
  const user = useGetUser();
  const alert = useSelector((state: RootState) => state.systemModule.alert);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const reload = async () => {
      try {
        await dispatch(reloadUser());
      } catch (err) {
        dispatch(setAlert({ message: 'Could not get logged in user', type: 'error' }));
      }
    };
    reload();
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      console.info('No user, redirecting to login');
      navigate('/login');
    }
  }, [navigate, user]);

  const handleCloseAlert = () => {
    dispatch(setAlert(null));
  };

  return (
    <div className="app main-layout">
      <AppHeader user={user} />
      <Routes>
        <Route path="/" element={<MyHeroesPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/hero/:id" element={<HeroPage />} />
        <Route path="*" element={<MyHeroesPage />} />
      </Routes>
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
