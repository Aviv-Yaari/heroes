import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorMessage } from '../components/ErrorMessage';
import { HeroList } from '../components/HeroList';
import { heroService } from '../services/hero.service';
import { RootState } from '../store/store';
import { Hero } from '../store/user.reducer';

export function MyHeroes() {
  const user = useSelector((state: RootState) => state.userModule.user);
  const [heroes, setHeroes] = useState<Hero[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getHeroes = async () => {
      try {
        const heroes = await heroService.query({ userId: user._id });
        setHeroes(heroes);
      } catch (err) {
        setError(err as string);
      }
    };
    getHeroes();
  }, [user._id]);

  const handleTrain = async (heroId: string) => {
    try {
      const updatedHero = await heroService.train(heroId);
      setHeroes(heroes => heroes!.map(hero => (hero._id === updatedHero._id ? updatedHero : hero)));
    } catch (err) {
      setError(err as string);
    }
  };

  if (!heroes) return <div>Loading...</div>;
  return (
    <main>
      {error && <ErrorMessage message={error} />}
      {heroes.length === 0 && <div>No heroes to show</div>}
      {heroes.length > 0 && <HeroList heroes={heroes} onTrain={handleTrain} />}
    </main>
  );
}
