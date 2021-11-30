import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HeroDetails } from '../components/HeroDetails';
import { HeroProgress } from '../components/HeroProgress';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Hero, heroService } from '../services/hero.service';
import { setAlert } from '../store/system.actions';

export function HeroPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    const getHero = async () => {
      try {
        const hero = await heroService.query({ _id: id });
        setHero(hero[0]);
      } catch (err) {
        setAlert({ message: 'Could not get hero data', type: 'error' });
      }
    };
    getHero();
  }, [id]);

  if (!hero) return <LoadingSpinner />;
  return (
    <div className="container">
      <main className="content hero-page">
        <button className="btn-link" onClick={() => navigate(-1)}>
          Back
        </button>
        <HeroDetails hero={hero} />
        <HeroProgress trainingHistory={hero.trainingHistory} />
      </main>
    </div>
  );
}
