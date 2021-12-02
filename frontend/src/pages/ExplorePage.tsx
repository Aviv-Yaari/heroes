import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeroFilter } from '../components/HeroFilter';
import { HeroList } from '../components/HeroList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useGetUser } from '../hooks/useGetUser';
import { heroService } from '../services/hero.service';
import { Hero } from '../services/hero.service';
import { utilService } from '../services/util.service';
import { setAlert } from '../store/system.actions';
import { reloadUser } from '../store/user.actions';

export interface Filter {
  userId?: string;
  ability?: 'defender' | 'attacker';
  minPower: number;
  maxPower: number;
}

export function ExplorePage() {
  const [heroes, setHeroes] = useState<Hero[] | null>(null);
  const [filter, setFilter] = useState<Filter>({ minPower: 0, maxPower: 1000 });
  const user = useGetUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const getHeroes = async () => {
      try {
        const heroes = await heroService.query(filter);
        const excludingUser = heroes.filter(hero => hero.userId?._id !== user?._id);

        setHeroes(excludingUser);
      } catch (err) {
        dispatch(setAlert({ message: 'Could not get hero data', type: 'error' }));
      }
    };
    if (!user) return;
    utilService.debounce(getHeroes, 100);
  }, [dispatch, user, filter]);

  const handleFilter = (fieldName: keyof Filter, value: any) => {
    setFilter(filter => {
      if (value === undefined) {
        let copy = { ...filter };
        delete copy[fieldName];
        return copy;
      } else {
        return { ...filter, [fieldName]: value };
      }
    });
  };

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
        <HeroFilter filter={filter} onFilter={handleFilter} maxPower={1000} />
        <HeroList heroes={heroes} type="Explore" onBuy={handleBuy} />
      </main>
    </div>
  );
}
