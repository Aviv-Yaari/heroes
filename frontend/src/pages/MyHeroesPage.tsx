import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HeroList } from '../components/HeroList';
import { heroService } from '../services/hero.service';
import { Hero } from '../services/hero.service';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { setAlert } from '../store/system.actions';
import { reloadUser } from '../store/user.actions';
import { useCheckUser } from '../hooks/useCheckUser';

export function MyHeroesPage() {
  const user = useCheckUser();
  const dispatch = useDispatch();
  const [heroes, setHeroes] = useState<Hero[] | null>(null);

  useEffect(() => {
    const getHeroes = async () => {
      try {
        if (!user) return;
        const heroes = await heroService.query({ userId: user._id });
        setHeroes(heroes);
      } catch (err) {
        dispatch(setAlert({ message: 'Could not get hero data', type: 'error' }));
      }
    };
    getHeroes();
  }, [dispatch, user]);

  const handleTrain = async (heroId: string) => {
    try {
      const updatedHero = await heroService.train(heroId);
      await dispatch(reloadUser());
      setHeroes(heroes => heroes!.map(hero => (hero._id === updatedHero._id ? updatedHero : hero)));
    } catch (err) {
      dispatch(setAlert({ message: 'Could not train hero', type: 'error' }));
    }
  };

  if (!heroes) return <LoadingSpinner />;
  return (
    <main className="container">
      <div className="content my-heroes-page">
        <h2 className="text-center">My heroes</h2>
        {heroes.length === 0 && <div>You don't own any heroes yet.</div>}
        {heroes.length > 0 && <HeroList heroes={heroes} type="My Heroes" onTrain={handleTrain} />}
      </div>
    </main>
  );
}
