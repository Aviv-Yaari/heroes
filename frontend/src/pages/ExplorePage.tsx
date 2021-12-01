import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeroList } from '../components/HeroList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useCheckUser } from '../hooks/useCheckUser';
import { heroService } from '../services/hero.service';
import { Hero } from '../services/hero.service';
import { setAlert } from '../store/system.actions';
import { reloadUser } from '../store/user.actions';

export function ExplorePage() {
  const [heroes, setHeroes] = useState<Hero[] | null>(null);
  const user = useCheckUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const getHeroes = async () => {
      try {
        const heroes = await heroService.query();
        const excludingUser = heroes.filter(hero => hero.userId?._id !== user?._id);
        setHeroes(excludingUser);
      } catch (err) {
        dispatch(setAlert({ message: 'Could not get hero data', type: 'error' }));
      }
    };
    if (!user) return;
    getHeroes();
  }, [dispatch, user]);

  const handleBuy = async (heroId: string) => {
    try {
      const updatedHero = await heroService.buy(heroId);
      setHeroes(heroes => heroes!.map(hero => (hero._id === updatedHero._id ? updatedHero : hero)));
      await dispatch(reloadUser());
      dispatch(setAlert({ message: 'Hero bought', type: 'success' }));
    } catch (err) {
      dispatch(setAlert({ message: 'Could not buy hero', type: 'error' }));
    }
  };

  if (!heroes) return <LoadingSpinner />;
  return (
    <div className="container">
      <main className="content explore-page">
        <h2>Explore</h2>
        {user?.isAdmin && <Link to="/add">Admin: Add a Hero</Link>}
        <HeroList heroes={heroes} type="Explore" onBuy={handleBuy} />
      </main>
    </div>
  );
}
