import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { HeroList } from '../components/HeroList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { heroService } from '../services/hero.service';
import { Hero } from '../services/hero.service';
import { RootState } from '../store/store';
import { getCurrentUser } from '../store/user.actions';

export function ExplorePage() {
  const [heroes, setHeroes] = useState<Hero[] | null>(null);
  const [error, setError] = useState('');
  const user = useSelector((state: RootState) => state.userModule.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getHeroes = async () => {
      const heroes = await heroService.query();
      setHeroes(heroes);
    };
    getHeroes();
  }, []);

  const handleBuy = async (heroId: string) => {
    try {
      const updatedHero = await heroService.buy(heroId);
      setHeroes(heroes => heroes!.map(hero => (hero._id === updatedHero._id ? updatedHero : hero)));
      dispatch(getCurrentUser());
    } catch (err) {
      setError(err as string);
    }
  };

  if (!heroes) return <LoadingSpinner />;
  return (
    <>
      <div className="container">
        <main className="content explore-page">
          {error && <ErrorMessage message={error} />}
          {user.isAdmin && (
            <button>
              <Link to="/add">Add</Link>
            </button>
          )}
          <HeroList heroes={heroes} type="Explore" onBuy={handleBuy} />
        </main>
      </div>
    </>
  );
}
