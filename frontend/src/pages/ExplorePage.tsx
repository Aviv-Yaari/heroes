import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeroList } from '../components/HeroList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { heroService } from '../services/hero.service';
import { Hero } from '../services/hero.service';
import { RootState } from '../store/store';
import { setAlert } from '../store/system.actions';
import { getCurrentUser } from '../store/user.actions';

export function ExplorePage() {
  const [heroes, setHeroes] = useState<Hero[] | null>(null);
  const user = useSelector((state: RootState) => state.userModule.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getHeroes = async () => {
      const heroes = await heroService.query();
      const excludingUser = heroes.filter(hero => hero.userId?._id !== user._id);
      setHeroes(excludingUser);
    };
    getHeroes();
  }, [user._id]);

  const handleBuy = async (heroId: string) => {
    try {
      const updatedHero = await heroService.buy(heroId);
      setHeroes(heroes => heroes!.map(hero => (hero._id === updatedHero._id ? updatedHero : hero)));
      dispatch(getCurrentUser());
    } catch (err) {
      dispatch(setAlert({ message: err as string, type: 'error' }));
    }
  };

  if (!heroes) return <LoadingSpinner />;
  return (
    <>
      <div className="container">
        <main className="content explore-page">
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
